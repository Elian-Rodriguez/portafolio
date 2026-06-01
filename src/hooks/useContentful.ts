import { useEffect, useRef, useState } from 'react'

// Module-level cache so data survives remounts and isn't refetched per section.
const cache = new Map<string, unknown>()

interface QueryState<T> {
  data: T
  loading: boolean
  error: boolean
}

export function useContentful<T>(
  key: string,
  fetcher: () => Promise<T>,
  fallback: T,
): QueryState<T> {
  const [data, setData] = useState<T>(() =>
    cache.has(key) ? (cache.get(key) as T) : fallback,
  )
  const [loading, setLoading] = useState(!cache.has(key))
  const [error, setError] = useState(false)
  const fetcherRef = useRef(fetcher)
  fetcherRef.current = fetcher

  useEffect(() => {
    if (cache.has(key)) {
      setData(cache.get(key) as T)
      setLoading(false)
      return
    }
    let active = true
    setLoading(true)
    fetcherRef
      .current()
      .then((res) => {
        if (!active) return
        cache.set(key, res)
        setData(res)
      })
      .catch((err) => {
        console.error(`[useContentful:${key}]`, err)
        if (active) setError(true)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [key])

  return { data, loading, error }
}

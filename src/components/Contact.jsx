import React, { useState, useEffect } from 'react';
import './Contact.css';
import * as contentful from 'contentful';

const tockenBootTelegram = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;
const chatId = process.env.REACT_APP_CHAT_TELEGRAM;

const client = contentful.createClient({
  space: process.env.REACT_APP_SPACE,
  environment: process.env.REACT_APP_ENVIRONMENT,
  accessToken: process.env.REACT_APP_ACCESS_TOKEN,
});

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const date = new Date().toUTCString();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name,
      email,
      phone,
      message,
    };
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        setStatus('success');
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        // Enviar el mensaje a Telegram
        const telegramMessage = `Nombre: ${name}\n Email: ${email}\n Teléfono: ${phone}\n Mensaje: ${message}\n\n  Fecha de envío: ${date}`;
        fetch(`https://api.telegram.org/bot${tockenBootTelegram}/sendMessage?chat_id=${chatId}&text=${telegramMessage}`)
          .then((res) => {
            console.log('Mensaje enviado a Telegram');
          })
          .catch((err) => {
            console.log('Error al enviar mensaje a Telegram', err);
          });
      })
      .catch((err) => {
        setStatus('error');
        console.log(err);
        console.log('error');
      });
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    client
      .getEntries({ content_type: 'contactoImages' })
      .then((response) => setData(response.items))
      .catch(console.error);
  }, []);

  const [imageList, setImageList] = useState([]);
  useEffect(() => {
    const imageUrlList = data.map((item) =>
      item.fields.imagenTecnologiaContacto.fields.file.url.replace('http://', 'https://')
    );
    setImageList(imageUrlList);
  }, [data]);

  const [currentImage, setCurrentImage] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((currentImage + 1) % imageList.length);
    }, 2000); // Cambia de imagen cada x tiempo

    return () => clearInterval(intervalId);
  }, [currentImage, imageList]);




  return (
    <div className="ContainerContact">
      <div className="left">
        <section id="contact">
          <div className="container">
            <h2>Contactame</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nombre:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Teléfono/Celular:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">En qué te puedo ayudar:</label>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  required
                ></textarea>
              </div>
              {status === 'success' && (
                <div className="alert alert-success" role="alert">
                  ¡Gracias por contactarme! Me pondré en contacto en breve.
                </div>
              )}
              {status === 'error' && (
                <div className="alert alert-danger" role="alert">
              Lo siento, hubo un error al enviar tu mensaje. Por favor, inténtelo de nuevo más tarde.
            </div>
          )}
          <button type="submit">Enviar Mensaje <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-telegram" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4"></path>
</svg> </button>
        </form>
      </div>
    </section>
    </div>
    <div className='right'>
    <img src={imageList[currentImage]} alt="Current" />

    </div>
    </div>
  );
}

export default Contact;

import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

// const BASE_URL = 'http://localhost:3000';
// const BASE_URL = 'https://wd048-crud-pg.onrender.com';
const BASE_URL = import.meta.env.VITE_BASE_URL; // having a .env file to access the BASE_URL everywhere - remember to add this in your Netlify deploment
// console.log(BASE_URL);

const initialFormState = {
  author: '',
  title: '',
  content: '',
};
function App() {
  const [articles, setArticles] = useState(null);
  const [err, setErr] = useState(null);

  // const [autor, setAuthor] = useState('');

  const [formState, setFormState] = useState(initialFormState);

  useEffect(() => {
    const fetchAllArticles = async () => {
      try {
        const res = await fetch(`${BASE_URL}/articles`);
        const data = await res.json();
        setArticles(data.data);
      } catch (error) {
        setErr(error.message);
      }
    };

    fetchAllArticles();
  }, []);

  const handleFormChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value }); // setting formState depending on the name of the input field
  };

  // console.log(formState);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/articles`, {
        method: 'POST',
        body: JSON.stringify(formState),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // const res = await axios.post(`${BASE_URL}/articles`, formState);
      // // const data = await res.json();

      // console.log(res);
      setArticles((prev) => [...prev, res.data.data]);

      // resetting the form
      setFormState(initialFormState);
    } catch (error) {
      setErr(error.message);
    }
  };

  // PUT fetch request example
  // const res = await fetch(`${BASE_URL}/articles/${id}`, {
  //       method: 'PUT',
  //       body: JSON.stringify(formState),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //
  // DELETE fetch request example
  // const res = await fetch(`${BASE_URL}/articles/${id}`, {
  //       method: 'DELETE',
  //     });
  //

  return (
    <>
      <h1>Articles!</h1>
      <div>
        {articles ? (
          articles.map((article) => (
            <div key={article.id}>
              <h2>{article.title}</h2>
              <p>{article.author}</p>
              <p>{article.content}</p>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          Author: <input type='text' name='author' value={formState.author} onChange={handleFormChange} />
        </label>
        <label>
          Title <input type='text' name='title' value={formState.title} onChange={handleFormChange} />
        </label>
        <label>
          Content:{' '}
          <textarea name='content' cols='30' rows='10' value={formState.content} onChange={handleFormChange}></textarea>
        </label>
        <button>Post</button>
      </form>
    </>
  );
}

export default App;

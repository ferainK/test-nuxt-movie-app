const express = require('express')
const axios = require('axios');

const app = express()
const { OMDB_API_KEY } = process.env;

//통신된 파일이 json 형태임을 명시
app.use(express.json())
//.get vs .post  (프론드엔드와 동일해야함)
app.post('/', async (req, res) => {
  const { title, type, year, page, id } = req.body;

  const url = id
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`;

  try {
    const { data } = await axios.get(url);
    if (data.Error) {
      res.status(400)
         .json(data.Error)
    }
    res.status(200)
        .json(data)
  } catch (error) {
    res.status(error.response.status)
        .json(error.message)
  }
})

module.exports = app
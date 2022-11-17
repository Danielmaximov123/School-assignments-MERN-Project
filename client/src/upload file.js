import React from 'react'
import { axios } from 'axios';
import { useState } from 'react';
import { urlApi } from './redux/api';

const UploadFileComp = () => {
    const [selectedFile, setSelectedFile] = useState();

	const handleSubmit = async (e) => {
    e.preventDefault()
    const form = new FormData()
    form.append('file' , selectedFile)

    let data = await axios.post(`${urlApi}/missions`, form, {
        headers: { "Content-Type" : "application/x-www-form-urlencoded" }
      })
	};


  return (
    <div>
        <form onSubmit={e => handleSubmit(e)} method="POST">
            <input type="file" name="mypic" required onChange={e => setSelectedFile(e.target.files[0])}/>
            <button type="submit">submit</button>
        </form>
    </div>
  )
}

export default UploadFileComp
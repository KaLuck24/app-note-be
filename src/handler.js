const fs = require('fs');
const { nanoid } = require("nanoid");
const notes = require("./notes.js");
const { request } = require('http');


/*
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updateAt = createdAt;

  const newNotes = {
    id,
    tags,
    body,
    id,
    createdAt,
    updateAt,
  };

  notes.push(newNotes);

  const isSuccess = notes.filter((note) => { note.id === id}).length > 0;

  if (isSuccess) {
    const response = h.response({
        status: 'success',
        message: 'Catatan berhasil ditambahkan!',
        data: {
            noteId: id,
        }
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'failed',
    message: 'Catatan gagal ditambahkan!',
  });
  response.code(500);
  return response;
};

function addname(name) {
  return `Halo ${name}`;
}
*/

/*
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Catatan berhasil ditambahkan",
      data: {
        noteId: id,
      },
    });
    response.code(201);
    console.log(`Berhasil`);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Catatan gagal ditambahkan",
  });
  response.code(500);
  return response;

  /*
  try {
    fs.writeFileSync('src/notes.js', JSON.stringify(notes, null, 2));

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    console.log(`Catatan berhasil tersimpan di notes.js`);
    return response;
  } catch (error) {
    console.log('Gagal Menambahkan data di notes.js', error);
    const response = h.response({
      status: 'failed',
      message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
  }
};
*/

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  console.log("Payload diterima:", request.payload); // Debugging

  if (!title || !tags || !body) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan catatan. Pastikan semua data terisi.",
    });
    response.code(400);
    return response;
  }

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);
  console.log("Data yang disimpan:", newNote); // Debugging

  const isSuccess = notes.some((note) => note.id === id);

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Catatan berhasil ditambahkan",
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Catatan gagal ditambahkan",
  });
  response.code(500);
  return response;
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
})

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];
  
  if(note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
}

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updateAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if(index !== -1) {
    notes[index] = {
      ...notes[index],
      id,
      title,
      tags,
      body,
      updateAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diubah',
    });
    response.code(200);
    return response;
  }; 

  const response = h.response({
    status: 'failed',
    message: 'Catatan tidak ditemukan!',
  });
  response.code(404);
  return response;
}

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((n) => n.id === id);
  
  if(index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    console.log('catatan berhasil dihapus');
    return response;
  }

  const response = h.response({
    status: 'failed',
    message: 'Catatan gagal dihapus, Id tidak ditemukan!',
  });
  response.code(404);
  console.log('Catatan gagal dihapus');
  return response;
}

module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler };

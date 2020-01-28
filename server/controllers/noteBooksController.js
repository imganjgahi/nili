const NoteBookModel = require("../models/noteBook")
const Task = require("../models/task")
exports.getAllNoteBooks = (req, res, next) => {

    NoteBookModel.findAll({ where: { userId: req.user.id, status: 1 } }).then(data => {
        return res.json({ data })
    }).catch(err => {
        console.log(err.message)
        next(err)
    });
};
exports.getNoteBooksById = (req, res, next) => {
    NoteBookModel.findOne({ where: { userId: req.user.id, status: 1, id: req.params.id } }).then(noteBook => {
        return res.json({ noteBook })
    }).catch(err => {
        console.log(err.message)
        next(err)
    });
};
exports.getNoteBookTask = (req, res, next) => {
    NoteBookModel.findOne({
        attributes: ['id', 'title'],
        include: [{
        model: Task,
        as: 'tasks',
        where: { status: 1 } // specifies how we want to be able to access our joined rows on the returned data
      }], where: { userId: req.user.id, status: 1, id: req.params.id } }).then(noteBook => {
        return res.json({ noteBook })
    }).catch(err => {
        console.log(err.message)
        next(err)
    });
};
exports.createNoteBooks = async (req, res, next) => {
    const data = req.body;
    NoteBookModel.create({
        title: data.title,
        status: 1,
        avatar: "noteBook.jpg",
        userId: req.user.id
    }).then(() => {
        return res.json({ message: "NoteBook Added" })
    }).catch(err => {
        console.log(err.message)
        next(err)
    });

};
exports.updateNoteBooks = (req, res, next) => {
    const data = req.body

    NoteBookModel.findOne({ where: { userId: req.user.id, id: req.params.id } }).then(noteBook => {

        if (!noteBook) {
            return res.status(400).json({ message: "notebook not found" })
        }
        noteBook.title = data.title;
        noteBook.status = data.status;
        noteBook.avatar = data.avatar;
        noteBook.save();
        return res.status(200).json({ message: "notebook was updated" })
    }).catch(err => {
        console.log(err.message)
        next(err)
    });
};
exports.deleteNoteBooks = (req, res, next) => {

    NoteBookModel.findOne({ where: { userId: req.user.id, id: req.params.id } }).then(noteBook => {

        if (!noteBook) {
            return res.status(400).json({ message: "notebook not found" })
        }
        noteBook.destroy().then(() => {
            return res.status(200).json({ message: "notebook was Deleted" })
        })

    }).catch(err => {
        console.log(err.message)
        next(err)
    });
};
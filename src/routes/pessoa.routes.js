const router = require('express-promise-router')();
const pessoaController = require('../controllers/pessoa.controller');

router.post('/pessoa', pessoaController.createUser);
router.get('/pessoa', pessoaController.listAllUsers);
router.get('/tibiadatas', pessoaController.migrateData);
router.get('/characters', pessoaController.migrateDataChar);

module.exports = router;
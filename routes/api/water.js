const express = require('express')

const router = express.Router()

// привіта я просто накидала якісь варіанти роутів, не запевняю що вони всі правильні але буде що обговорити))))))))

// додати запису про вживану воду
router.post('/notes');
// редагувати існуючу нотатку про воду 
router.patch('/notes');
// видалити нотатку
router.delete('/notes');


// ендпоінт для взяття води за поточний день
router.post('/consuption');
router.get('/consuption/:month')

module.exports = router
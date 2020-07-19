
import { Router } from 'express';

// Import the model to use its database functions.
import { twilioLogDb } from '../models/twilioModel.js';

const router = Router();

// Create all our routes and set up logic within those routes where required.
router.get('/', (req, res) => {
  twilioLogDb.selectAll((data) => {
    const hbsObject = {
      burgers: data,
    };
    res.render('index', hbsObject);
  });
});

router.post('/api/burgers', (req, res) => {
  twilioLogDb.insertOne(req.body.name, (result) => {
    // Send back the ID of the new burger
    res.json({ id: result.insertId });
  });
});

// Export routes for server.js to use.
export default router;

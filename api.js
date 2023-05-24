const express = require('express');

const admin = require('firebase-admin');
const serviceAccount = require('./key.json');
const cors = require('cors');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const port = 8080; 

const corsOptions = {
    origin: 'http://localhost:3000'
}

app.use(cors(corsOptions))

app.get('/', (req, res) => {
    res.send('Hello, this is the root route!');
  });

app.get('/paginateData', async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 10; 
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * pageSize;
    const sortBy = req.query.sortBy

    const snapshot = await admin.firestore()
      .collection('VehicleMerged')
      .orderBy("MakeName", sortBy)
      .limit(pageSize)
      .offset(offset)
      .get();

    const data = snapshot.docs.map(doc => doc.data());

    res.json(data);
  } catch (error) {
    console.error('Error retrieving paginated data:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/filterData/', async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * pageSize;
    const searchValue = (req.query.searchValue) || '';

    const snapshot = await admin.firestore()
      .collection('VehicleMerged')
      .orderBy('MakeName')
      .where('MakeName', '==', searchValue)
      .limit(pageSize)
      .offset(offset)
      .get();

    const data = snapshot.docs.map(doc => doc.data());

    res.json(data);
  } catch (error) {
    console.error('Error retrieving paginated data:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

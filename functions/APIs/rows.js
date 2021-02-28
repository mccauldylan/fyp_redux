const { db } = require('../util/admin');

exports.getCategory = (req, res) => {
    let categoryData = {};
    db.doc(`/categories/${req.params.categoryId}`)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return res.status(404).json({ error: 'category not found' });
        }
        categoryData = doc.data();
        categoryData.categoryId = doc.id;
        return db
          .collection('rows')
          .orderBy('index', 'asc')
          .where('categoryId', '==', req.params.categoryId)
          .get();
      })
      .then((data) => {
        categoryData.rows = [];
        data.forEach((doc) => {
          categoryData.rows.push(doc.data());
        });
        return res.json(categoryData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.code });
      });
  };

exports.postRow = (req, res) => {
    if (req.body.body.trim() === ''){
        return res.status(400).json({ comment: 'Must not be empty' });
    }   
    if (req.body.index.trim() === ''){
        return res.status(400).json({ comment: 'Must not be empty' });
    }
    if (req.body.dataType.trim() === ''){
        return res.status(400).json({ comment: 'Must not be empty' });
    }
    if (req.body.visit.trim() === ''){
        return res.status(400).json({ comment: 'Must not be empty' });
    }
  
    const newRow = {
    
      index: req.index,
      dataType: req.dataType,
      visit: req.visit,
      body: req.body.body,
      createdAt: new Date().toISOString(),
      categoryId: req.params.categoryId,
      disapproveCount: 0,
      approveCount: 0
    
    };
  
    db.doc(`/categories/${req.params.categoryId}`)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return res.status(404).json({ error: 'Category not found' });
        }
        return doc.ref.update({ rowCount: doc.data().rowCount + 1 });
      })
      .then(() => {
        return db.collection('rows').add(newRow);
      })
      .then(() => {
        res.json(newRow);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    });
};

exports.deleteRow = (req, res) => {
    const document = db.doc(`/rows/${req.params.rowId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Row not found' })
            }
            return document.delete();
        })
        .then(() => {
            res.json({ message: 'Delete successful' });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
};

exports.editRow = ( req, res ) => {
    if(req.body.rowId || req.body.createdAt){
        res.status(403).json({message: 'Not allowed to edit'});
    }
    let document = db.collection('rows').doc(`${req.params.rowId}`);
    document.update(req.body)
    .then(()=> {
        res.json({message: 'Updated successfully'});
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({
                error: err.code
        });
    });
};

exports.commentOnRow = (req, res) => {
    if (req.body.body.trim() === ''){
        return res.status(400).json({ comment: 'Must not be empty' });
    }   
  
    const newComment = {   
      body: req.body.body,
      createdAt: new Date().toISOString(),
      rowId: req.params.rowId  
    };
  
    db.doc(`/rows/${req.params.rowId}`)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return res.status(404).json({ error: 'Category not found' });
        }
      })
      .then(() => {
        return db.collection('comments').add(newComment);
      })
      .then(() => {
        res.json(newComment);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    });
};

exports.likeRow = (req, res) => {

  const likeDocument = db
    .collection('approves')
    .where('username', '==', req.user.username)
    .where('rowId', '==', req.params.rowId)
    .limit(1);

  const rowDocument = db.doc(`/rows/${req.params.rowId}`);

  let rowData;

  rowDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        rowData = doc.data();
        rowData.rowId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: 'Row not found' });
      }
    })
    .then((data) => {
      if (data.empty) {
        return db
          .collection('approves')
          .add({
            rowId: req.params.rowId,
            username: req.user.username
          })
          .then(() => {
            rowData.approveCount++;
            return rowDocument.update({ approveCount: rowData.approveCount });
          })
          .then(() => {
            return res.json(rowData);
          });
      } else {
        return res.status(400).json({ error: 'Row already approved' });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.dislikeRow = (req, res) => {

  const likeDocument = db
    .collection('disapproves')
    .where('username', '==', req.user.username)
    .where('rowId', '==', req.params.rowId)
    .limit(1);

  const rowDocument = db.doc(`/rows/${req.params.rowId}`);

  let rowData;

  rowDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        rowData = doc.data();
        rowData.rowId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: 'Row not found' });
      }
    })
    .then((data) => {
      if (data.empty) {
        return db
          .collection('disapproves')
          .add({
            rowId: req.params.rowId,
            username: req.user.username
          })
          .then(() => {
            rowData.disapproveCount++;
            return rowDocument.update({ disapproveCount: rowData.disapproveCount });
          })
          .then(() => {
            return res.json(rowData);
          });
      } else {
        return res.status(400).json({ error: 'Row already disapproved' });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.unlikeRow = (req, res) => {

  const likeDocument = db
    .collection('approves')
    .where('username', '==', req.user.username)
    .where('rowId', '==', req.params.rowId)
    .limit(1);

  const rowDocument = db.doc(`/rows/${req.params.rowId}`);

  let rowData;

  rowDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        rowData = doc.data();
        rowData.rowId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: 'Row not found' });
      }
    })
    .then((data) => {
      if (data.empty) {
        return res.status(400).json({ error: 'Row not approved, cant un-approve' });
      } else {
        return db.doc(`/approves/${data.docs[0].data().id}`).delete()
          .then(() => {
            rowData.approveCount--
            return rowDocument.update({approveCount: rowData.approveCount})
          })
          .then(()=>{
            return res.json(rowData)
          })
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.undoDislikeRow = (req, res) => {

  const likeDocument = db
    .collection('disapproves')
    .where('username', '==', req.user.username)
    .where('rowId', '==', req.params.rowId)
    .limit(1);

  const rowDocument = db.doc(`/rows/${req.params.rowId}`);

  let rowData;

  rowDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        rowData = doc.data();
        rowData.rowId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: 'Row not found' });
      }
    })
    .then((data) => {
      if (data.empty) {
        return res.status(400).json({ error: 'Row not disapproved, cant un-disapprove' });
      } else {
        return db.doc(`/disapproves/${data.docs[0].data().id}`).delete()
          .then(() => {
            rowData.disapproveCount--
            return rowDocument.update({disapproveCount: rowData.disapproveCount})
          })
          .then(()=>{
            return res.json(rowData)
          })
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};


'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function(req,res){
      try{

      const {input} = req.query
      const data = convertHandler.handleInput(input)
      res.json({...data})
      }catch(err){
        res.send(err)
      }
      
    })
};

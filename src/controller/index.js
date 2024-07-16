import express from 'express'
import roomController from './roomController.js'

const controller = express.Router();

controller.use('/room',roomController)

export default controller
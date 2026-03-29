import express from 'express'
import {
  createBuild,
  deleteBuild,
  getBuildById,
  getBuilds,
  seedBuilds,
  updateBuild
} from '../controllers/buildsController.js'

const router = express.Router()

router.get('/', getBuilds)
router.post('/seed', seedBuilds)
router.get('/:id', getBuildById)
router.post('/', createBuild)
router.put('/:id', updateBuild)
router.delete('/:id', deleteBuild)

export default router

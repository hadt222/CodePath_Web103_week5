import { pool } from '../config/database.js'
import { PREBUILT_BUILDS } from '../data/prebuiltBuilds.js'
import { calculatePrice, normalizeBuildInput, validateBuild } from '../utilities/builds.js'

function handleValidation(reqBody) {
  const normalizedBuild = normalizeBuildInput(reqBody)
  const validationError = validateBuild(normalizedBuild)

  if (validationError) {
    return { error: validationError }
  }

  return {
    build: {
      ...normalizedBuild,
      total_price: calculatePrice(normalizedBuild)
    }
  }
}

export const getBuilds = async (_, res) => {
  try {
    const result = await pool.query('SELECT * FROM custom_pc_builds ORDER BY id ASC')
    res.status(200).json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getBuildById = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('SELECT * FROM custom_pc_builds WHERE id = $1', [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Build not found.' })
    }

    res.status(200).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const createBuild = async (req, res) => {
  const { error, build } = handleValidation(req.body)

  if (error) {
    return res.status(400).json({ error })
  }

  try {
    const result = await pool.query(
      `INSERT INTO custom_pc_builds
      (build_name, case_color, cpu, gpu, ram, storage, cooling, rgb, total_price)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,
      [
        build.build_name,
        build.case_color,
        build.cpu,
        build.gpu,
        build.ram,
        build.storage,
        build.cooling,
        build.rgb,
        build.total_price
      ]
    )

    res.status(201).json(result.rows[0])
  } catch (dbError) {
    res.status(500).json({ error: dbError.message })
  }
}

export const updateBuild = async (req, res) => {
  const { id } = req.params
  const { error, build } = handleValidation(req.body)

  if (error) {
    return res.status(400).json({ error })
  }

  try {
    const result = await pool.query(
      `UPDATE custom_pc_builds
      SET build_name = $1,
          case_color = $2,
          cpu = $3,
          gpu = $4,
          ram = $5,
          storage = $6,
          cooling = $7,
          rgb = $8,
          total_price = $9
      WHERE id = $10
      RETURNING *`,
      [
        build.build_name,
        build.case_color,
        build.cpu,
        build.gpu,
        build.ram,
        build.storage,
        build.cooling,
        build.rgb,
        build.total_price,
        id
      ]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Build not found.' })
    }

    res.status(200).json(result.rows[0])
  } catch (dbError) {
    res.status(500).json({ error: dbError.message })
  }
}

export const deleteBuild = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('DELETE FROM custom_pc_builds WHERE id = $1 RETURNING *', [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Build not found.' })
    }

    res.status(200).json({ message: 'Build deleted successfully.', build: result.rows[0] })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const seedBuilds = async (_, res) => {
  try {
    for (const prebuilt of PREBUILT_BUILDS) {
      const build = {
        ...prebuilt,
        total_price: calculatePrice(prebuilt)
      }

      await pool.query(
        `INSERT INTO custom_pc_builds
        (build_name, case_color, cpu, gpu, ram, storage, cooling, rgb, total_price)
        SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9
        WHERE NOT EXISTS (
          SELECT 1 FROM custom_pc_builds WHERE build_name = $1
        )`,
        [
          build.build_name,
          build.case_color,
          build.cpu,
          build.gpu,
          build.ram,
          build.storage,
          build.cooling,
          build.rgb,
          build.total_price
        ]
      )
    }

    const result = await pool.query('SELECT * FROM custom_pc_builds ORDER BY id ASC')
    res.status(200).json({ message: 'Sample builds added.', builds: result.rows })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

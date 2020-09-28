import { pool } from "../../db/connection";

const createProject = async (project) => {
  let projectResult = null;

  await pool
    .connect()
    .then(async (client) => {
      await client
        .query(
          "insert into tb_project (description, leader_id, team_id) values ($1, $2, $3) returning *",
          [project.description, project.leader_id, 0]
        )
        .then((result) => {
          client.release();
          projectResult = result.rows[0];
        })
        .catch((err) => {
          client.release();
          throw err;
        });
    })
    .catch((err) => {
      console.log(err.stack);
      throw err;
    });

  return projectResult;
};

export default function register(app) {
  app.get("/project", async (req, res) => {
    try {
      pool.connect().then((client) => {
        return client
          .query("select * from tb_project")
          .then((result) => {
            client.release();
            // console.table(result.rows);

            return res.status(200).send(result.rows);
          })
          .catch((err) => {
            client.release();
            console.log(err.stack);
            throw err;
          });
      });
    } catch (err) {
      if (err.response) {
        return res.status(err.response.status).send(err.response.data);
      }

      return res.sendStatus(500);
    }
  });

  app.post("/project", async (req, res) => {
    try {
      const project = req.body;
      let { id } = await createProject(project);

      let projectInfo = {
        id: id,
        description: project.description,
        team_id: project.team_id, //TODO: get team by ID
        leader_id: project.leader_id, //TODO: get leader
      };

      return res.status(200).send(projectInfo);
    } catch (err) {
      throw err;
    }
  });
}

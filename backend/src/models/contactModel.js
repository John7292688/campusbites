const pool = require("../config/database");

const createMessage = async (
  name,
  email,
  subject,
  message
) => {
  const result = await pool.query(
    `
    INSERT INTO contact_messages
    (
      name,
      email,
      subject,
      message
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `,
    [name, email, subject, message]
  );

  return result.rows[0];
};

const getAllMessages = async () => {
  const result = await pool.query(
    `
    SELECT *
    FROM contact_messages
    ORDER BY created_at DESC;
    `
  );

  return result.rows;
};

const markAsRead = async (id) => {
  const result = await pool.query(
    `
    UPDATE contact_messages
    SET is_read = true
    WHERE id = $1
    RETURNING *;
    `,
    [id]
  );

  return result.rows[0];
};

module.exports = {
  createMessage,
  getAllMessages,
  markAsRead,
};

const pool = require("../config/database");

const createNotification = async (
  ownerId,
  title,
  message
) => {
  const result = await pool.query(
    `
    INSERT INTO notifications (
      owner_id,
      title,
      message
    )
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
    [ownerId, title, message]
  );

  return result.rows[0];
};

const getNotificationsByOwnerId = async (
  ownerId
) => {
  const result = await pool.query(
    `
    SELECT *
    FROM notifications
    WHERE owner_id = $1
    ORDER BY created_at DESC;
    `,
    [ownerId]
  );

  return result.rows;
};

const markNotificationAsRead = async (
  notificationId
) => {
  const result = await pool.query(
    `
    UPDATE notifications
    SET is_read = TRUE
    WHERE id = $1
    RETURNING *;
    `,
    [notificationId]
  );

  return result.rows[0];
};

module.exports = {
  createNotification,
  getNotificationsByOwnerId,
  markNotificationAsRead,
};
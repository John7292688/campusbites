const pool = require("../config/database");

const createNotification = async (
  studentId,
  title,
  message
) => {
  const result = await pool.query(
    `
    INSERT INTO student_notifications (
      student_id,
      title,
      message
    )
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
    [studentId, title, message]
  );

  return result.rows[0];
};

const getNotificationsByStudentId = async (
  studentId
) => {
  const result = await pool.query(
    `
    SELECT
    id,
    student_id,
    title,
    message,
    is_read,
    created_at::text AS created_at
    FROM student_notifications
    WHERE student_id = $1
    ORDER BY created_at DESC;
    `,
    [studentId]
  );

  return result.rows;
};

const markNotificationAsRead = async (
  notificationId
) => {
  const result = await pool.query(
    `
    UPDATE student_notifications
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
  getNotificationsByStudentId,
  markNotificationAsRead,
};
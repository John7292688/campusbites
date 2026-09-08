import { useEffect, useState } from "react";
import {
  getAllMessages,
  markMessageAsRead,
} from "../../services/contactService";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

function Messages() {

  const [filter, setFilter] =
  useState("all");

  const [messages, setMessages] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedMessage, setSelectedMessage] =
    useState(null);

  const [dialogOpen, setDialogOpen] =
    useState(false);  

  const [search, setSearch] =
  useState("");  

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleOpenMessage = async (
    message
    ) => {
    setSelectedMessage(message);
    setDialogOpen(true);

    if (!message.is_read) {
        try {
        await markMessageAsRead(
            message.id
        );

        setMessages((prev) =>
            prev.map((msg) =>
            msg.id === message.id
                ? {
                    ...msg,
                    is_read: true,
                }
                : msg
            )
        );

        setSelectedMessage((prev) => ({
            ...prev,
            is_read: true,
        }));
        } catch (error) {
        console.error(error);
        }
    }
    };

  const fetchMessages = async () => {
    try {
      const data =
        await getAllMessages();

      setMessages(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading messages...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>
        Contact Messages

        <span
          style={{
            marginLeft: "12px",
            background: "#EF4444",
            color: "#fff",
            padding: "4px 10px",
            borderRadius: "999px",
            fontSize: "14px",
          }}
        >
          {
            messages.filter(
              (msg) => !msg.is_read
            ).length
          }{" "}
          Unread
        </span>
      </h1>

      <input
      type="text"
      placeholder="Search by name, email or subject..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      style={{
        width: "100%",
        padding: "12px 16px",
        borderRadius: "10px",
        border: "1px solid #D1D5DB",
        marginBottom: "20px",
        fontSize: "15px",
      }}
    />

    <div
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
      }}
    >
      <button
        onClick={() => setFilter("all")}
        style={{
          padding: "10px 16px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          background:
            filter === "all"
              ? "#2563EB"
              : "#E5E7EB",
          color:
            filter === "all"
              ? "#fff"
              : "#111827",
        }}
      >
        📥 All
      </button>

      <button
        onClick={() => setFilter("unread")}
        style={{
          padding: "10px 16px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          background:
            filter === "unread"
              ? "#EF4444"
              : "#E5E7EB",
          color:
            filter === "unread"
              ? "#fff"
              : "#111827",
        }}
      >
        🔴 Unread
      </button>

      <button
        onClick={() => setFilter("read")}
        style={{
          padding: "10px 16px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          background:
            filter === "read"
              ? "#10B981"
              : "#E5E7EB",
          color:
            filter === "read"
              ? "#fff"
              : "#111827",
        }}
      >
        ✅ Read
      </button>
    </div>

      {messages.filter((message) => {
        const matchesSearch = (
          message.name +
          " " +
          message.email +
          " " +
          message.subject
        )
          .toLowerCase()
          .includes(search.toLowerCase());

        const matchesFilter =
          filter === "all"
            ? true
            : filter === "unread"
            ? !message.is_read
            : message.is_read;

        return matchesSearch && matchesFilter;
      }).length === 0 ? (
        <p>No messages found.</p>
      ) : (
        messages
        .filter((message) => {
          const matchesSearch = (
            message.name +
            " " +
            message.email +
            " " +
            message.subject
          )
            .toLowerCase()
            .includes(search.toLowerCase());

          const matchesFilter =
            filter === "all"
              ? true
              : filter === "unread"
              ? !message.is_read
              : message.is_read;

          return (
            matchesSearch &&
            matchesFilter
          );
        })
        .map((message) => (
          <div
            key={message.id}
            onClick={() =>
                handleOpenMessage(message)
            }
            style={{
                background: message.is_read
                ? "#fff"
                : "#EFF6FF",
                border: message.is_read
                ? "1px solid #E5E7EB"
                : "2px solid #3B82F6",
                padding: "20px",
                borderRadius: "12px",
                marginBottom: "16px",
                boxShadow:
                "0 2px 8px rgba(0,0,0,0.08)",
                cursor: "pointer",
                transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                "0 8px 20px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                "translateY(0)";
                e.currentTarget.style.boxShadow =
                "0 2px 8px rgba(0,0,0,0.08)";
            }}
            >
            {!message.is_read && (
                <span
                style={{
                    background: "#EF4444",
                    color: "#fff",
                    padding: "4px 8px",
                    borderRadius: "999px",
                    fontSize: "12px",
                    fontWeight: "600",
                    display: "inline-block",
                    marginBottom: "10px",
                }}
                >
                NEW
                </span>
            )}

            <h3>{message.subject}</h3>

            <p>
                <strong>Name:</strong>{" "}
                {message.name}
            </p>

            <p>
                <strong>Email:</strong>{" "}
                {message.email}
            </p>

            <p>
                <strong>Message:</strong>
            </p>

            <p
              style={{
                color: "#6B7280",
                marginTop: "8px",
              }}
            >
              {message.message.length > 100
                ? message.message.substring(0, 100) + "..."
                : message.message}
            </p>

            <small>
                {new Date(
                message.created_at
                ).toLocaleString()}
            </small>
            </div>
        ))
      )}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="md"
        >
        <DialogTitle>
            {selectedMessage?.subject}
        </DialogTitle>

        <DialogContent>
            <p>
            <strong>Name:</strong>{" "}
            {selectedMessage?.name}
            </p>

            <p>
            <strong>Email:</strong>{" "}
            {selectedMessage?.email}
            </p>

            <p>
            <strong>Date:</strong>{" "}
            {selectedMessage &&
                new Date(
                selectedMessage.created_at
                ).toLocaleString()}
            </p>

            <hr />

            <p>
            <strong>Message</strong>
            </p>

            <p
            style={{
                whiteSpace: "pre-wrap",
                lineHeight: "1.7",
            }}
            >
            {selectedMessage?.message}
            </p>
        </DialogContent>

        <DialogActions>
            <Button
            onClick={() =>
                setDialogOpen(false)
            }
            >
            Close
            </Button>
        </DialogActions>
        </Dialog>
    </div>
  );
}

export default Messages;
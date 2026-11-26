
import { useEffect, useMemo, useState } from "react";
import { supabase } from "./supabase";
import "./Admin.css";

export default function Admin() {
  const [session, setSession] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [selected, setSelected] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_event, newSession) => {
        setSession(newSession);
      });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) loadEnquiries();
    else {
      setEnquiries([]);
      setSelected(null);
    }
  }, [session]);

  async function loadEnquiries() {
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) setMessage("Loading failed: " + error.message);
    else setEnquiries(data || []);

    setLoading(false);
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setMessage(error.message);
    setLoading(false);
  }

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) setMessage(error.message);
  }

  async function updateStatus(id, status) {
    const { error } = await supabase
      .from("enquiries")
      .update({ status })
      .eq("id", id);

    if (error) {
      setMessage("Status update failed: " + error.message);
      return;
    }

    setEnquiries((old) =>
      old.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );

    setSelected((old) =>
      old?.id === id ? { ...old, status } : old
    );

    setMessage("Status updated successfully.");
  }

  async function deleteEnquiry(id) {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this enquiry?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("enquiries")
      .delete()
      .eq("id", id);

    if (error) {
      setMessage("Delete failed: " + error.message);
      return;
    }

    setEnquiries((old) => old.filter((item) => item.id !== id));
    setSelected((old) => old?.id === id ? null : old);
    setMessage("Enquiry deleted successfully.");
  }

  async function copyText(value, label) {
    if (!value) {
      setMessage(label + " is not available.");
      return;
    }

    try {
      await navigator.clipboard.writeText(String(value));
      setMessage(label + " copied successfully.");
    } catch {
      setMessage("Copy failed. Please copy it manually.");
    }
  }

  const filtered = useMemo(() => {
    return enquiries.filter((item) => {
      const term = search.toLowerCase();

      const matchesSearch = [
        item.full_name,
        item.email,
        item.phone,
        item.service,
        item.message,
      ].some((value) =>
        String(value || "").toLowerCase().includes(term)
      );

      const matchesStatus =
        filter === "All" ||
        (item.status || "New") === filter;

      const itemDate = item.created_at
        ? new Date(item.created_at)
        : null;

      const dateString = itemDate
        ? [
            itemDate.getFullYear(),
            String(itemDate.getMonth() + 1).padStart(2, "0"),
            String(itemDate.getDate()).padStart(2, "0"),
          ].join("-")
        : "";

      const matchesStart = !startDate || dateString >= startDate;
      const matchesEnd = !endDate || dateString <= endDate;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesStart &&
        matchesEnd
      );
    });
  }, [enquiries, search, filter, startDate, endDate]);

  const total = enquiries.length;
  const newCount = enquiries.filter(
    (e) => (e.status || "New") === "New"
  ).length;
  const progressCount = enquiries.filter(
    (e) => e.status === "In Progress"
  ).length;
  const completedCount = enquiries.filter(
    (e) => e.status === "Completed"
  ).length;

  const serviceCounts = enquiries.reduce((acc, item) => {
    const service = item.service || "Other";
    acc[service] = (acc[service] || 0) + 1;
    return acc;
  }, {});

  const topService = Object.entries(serviceCounts).sort(
    (a, b) => b[1] - a[1]
  )[0];

  function exportCSV() {
    if (filtered.length === 0) {
      setMessage("There are no enquiries to export.");
      return;
    }

    const columns = [
      "ID",
      "Full Name",
      "Email",
      "Phone",
      "Service",
      "Budget",
      "Message",
      "Status",
      "Created At",
    ];

    const escapeCSV = (value) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const rows = filtered.map((item) => [
      item.id,
      item.full_name,
      item.email,
      item.phone,
      item.service,
      item.budget,
      item.message,
      item.status || "New",
      item.created_at,
    ]);

    const csv = [
      columns.map(escapeCSV).join(","),
      ...rows.map((row) => row.map(escapeCSV).join(",")),
    ].join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `NextGen-IT-Enquiries-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setMessage(`${filtered.length} enquiries exported successfully.`);
  }

  function clearFilters() {
    setSearch("");
    setFilter("All");
    setStartDate("");
    setEndDate("");
  }

  if (!session) {
    return (
      <div className="admin-login-page">
        <form className="admin-login" onSubmit={handleLogin}>
          <div className="login-logo">N</div>
          <h2>NextGen IT</h2>
          <p>Admin Portal · Secure Login</p>

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {message && <p className="admin-error">{message}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <small>Authorized access only</small>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <span className="sidebar-logo">N</span>
          <div>
            <strong>NextGen IT</strong>
            <small>ADMIN PANEL</small>
          </div>
        </div>

        <p className="sidebar-label">MAIN MENU</p>

        {["Dashboard", "Enquiries"].map((tab) => (
          <button
            key={tab}
            className={`sidebar-link ${
              activeTab === tab ? "active" : ""
            }`}
            onClick={() => {
              setActiveTab(tab);
              setSelected(null);
            }}
          >
            <span>{tab === "Dashboard" ? "▦" : "✉"}</span>
            {tab}
          </button>
        ))}

        <div className="sidebar-bottom">
          <div className="admin-profile">
            <div className="profile-avatar">A</div>
            <div>
              <strong>Administrator</strong>
              <small>Super Admin</small>
            </div>
          </div>

          <button className="logout-button" onClick={handleLogout}>
            ↪ Logout
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <span className="topbar-label">NEXTGEN IT / ADMIN</span>
            <h2>{activeTab}</h2>
          </div>

          <button
            className="refresh-button"
            onClick={loadEnquiries}
            disabled={loading}
          >
            ↻ Refresh
          </button>
        </header>

        <div className="admin-workspace">
          <div className="welcome-heading">
            <div>
              <h1>
                {activeTab === "Dashboard"
                  ? "Welcome Back, Admin"
                  : "Manage Enquiries"}
              </h1>
              <p>Monitor and manage customer enquiries.</p>
            </div>

            <span className="live-label">● LIVE DATA</span>
          </div>

          {message && (
            <div className="admin-notice">
              {message}
              <button onClick={() => setMessage("")}>×</button>
            </div>
          )}

          {activeTab === "Dashboard" && (
            <>
              <section className="stats-grid">
                <StatCard
                  label="Total Enquiries"
                  value={total}
                  symbol="▤"
                  color="blue"
                />
                <StatCard
                  label="New Enquiries"
                  value={newCount}
                  symbol="✉"
                  color="orange"
                />
                <StatCard
                  label="In Progress"
                  value={progressCount}
                  symbol="◷"
                  color="purple"
                />
                <StatCard
                  label="Completed"
                  value={completedCount}
                  symbol="✓"
                  color="green"
                />
              </section>

              <section className="analytics-panel">
                <div>
                  <h3>Service Analytics</h3>
                  <p>Most requested service based on all enquiries</p>
                </div>

                <div className="top-service">
                  <span>Top Requested Service</span>
                  <strong>{topService ? topService[0] : "No data yet"}</strong>
                  <small>
                    {topService
                      ? `${topService[1]} enquiry/enquiries`
                      : "New enquiries will appear here"}
                  </small>
                </div>

                <div className="service-breakdown">
                  {Object.entries(serviceCounts)
                    .sort((a, b) => b[1] - a[1])
                    .map(([service, count]) => (
                      <div className="service-row" key={service}>
                        <span>{service}</span>
                        <div className="service-track">
                          <div
                            className="service-fill"
                            style={{
                              width: `${(count / total) * 100}%`,
                            }}
                          />
                        </div>
                        <strong>{count}</strong>
                      </div>
                    ))}
                </div>
              </section>
            </>
          )}

          <section className="table-panel">
            <div className="panel-heading">
              <div>
                <h3>
                  {activeTab === "Dashboard"
                    ? "Recent Enquiries"
                    : "All Enquiries"}
                </h3>
                <p>Search, filter, export and manage enquiries</p>
              </div>

              <span className="record-count">
                {filtered.length} RECORDS
              </span>
            </div>

            <div className="table-toolbar">
              <input
                type="search"
                placeholder="Search name, email, phone or service..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="date-toolbar">
              <label>
                From
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </label>

              <label>
                To
                <input
                  type="date"
                  value={endDate}
                  min={startDate || undefined}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </label>

              <button className="clear-filter" onClick={clearFilters}>
                Clear Filters
              </button>

              <button className="export-button" onClick={exportCSV}>
                ↓ Export CSV
              </button>
            </div>

            {loading ? (
              <p className="empty-state">Loading enquiries...</p>
            ) : filtered.length === 0 ? (
              <p className="empty-state">No enquiries found.</p>
            ) : (
              <div className="table-scroll">
                <table className="enquiry-table">
                  <thead>
                    <tr>
                      <th>CLIENT</th>
                      <th>SERVICE</th>
                      <th>DATE</th>
                      <th>STATUS</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>

                  <tbody>
                    {(activeTab === "Dashboard"
                      ? filtered.slice(0, 5)
                      : filtered
                    ).map((item) => (
                      <tr key={item.id}>
                        <td>
                          <strong>{item.full_name}</strong>
                          <small>{item.email}</small>
                        </td>

                        <td>{item.service || "General Enquiry"}</td>

                        <td>
                          {item.created_at
                            ? new Date(item.created_at).toLocaleDateString()
                            : "—"}
                        </td>

                        <td>
                          <select
                            className={`status-select status-${(
                              item.status || "New"
                            ).toLowerCase().replace(" ", "-")}`}
                            value={item.status || "New"}
                            onChange={(e) =>
                              updateStatus(item.id, e.target.value)
                            }
                          >
                            <option value="New">New</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>

                        <td>
                          <div className="table-actions">
                            <button onClick={() => setSelected(item)}>
                              View
                            </button>
                            <button
                              className="delete-action"
                              onClick={() => deleteEnquiry(item.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {selected && (
            <section className="details-panel">
              <div className="panel-heading">
                <div>
                  <h3>Enquiry Details</h3>
                  <p>Complete customer information</p>
                </div>

                <button
                  className="close-button"
                  onClick={() => setSelected(null)}
                >
                  Close ×
                </button>
              </div>

              <div className="details-grid">
                <Detail label="Full Name" value={selected.full_name} />

                <Detail
                  label="Email"
                  value={selected.email}
                  action={() => copyText(selected.email, "Email")}
                />

                <Detail
                  label="Phone"
                  value={selected.phone}
                  action={() => copyText(selected.phone, "Phone")}
                />

                <Detail label="Service" value={selected.service} />
                <Detail label="Budget" value={selected.budget} />
                <Detail
                  label="Status"
                  value={selected.status || "New"}
                />

                <Detail
                  label="Received On"
                  value={
                    selected.created_at
                      ? new Date(selected.created_at).toLocaleString()
                      : "Not available"
                  }
                />
              </div>

              <div className="message-box">
                <strong>Customer Message</strong>
                <p>{selected.message || "No message provided."}</p>
              </div>
            </section>
          )}

          <footer className="admin-footer">
            © {new Date().getFullYear()} NextGen IT. Admin Dashboard.
          </footer>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, symbol, color }) {
  return (
    <div className="stat-card">
      <div>
        <p>{label}</p>
        <h2>{value}</h2>
      </div>
      <span className={`stat-icon ${color}`}>{symbol}</span>
    </div>
  );
}

function Detail({ label, value, action }) {
  return (
    <div className="detail-item">
      <small>{label}</small>
      <strong>{value || "Not provided"}</strong>
      {action && (
        <button className="copy-button" onClick={action}>
          Copy
        </button>
      )}
    </div>
  );
}

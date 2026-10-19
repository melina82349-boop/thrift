
import { useState } from "react";
import "./Login.css";

function Login({ onCreateAccount }) {
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const value = identifier.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^(?:\+977[- ]?|0)?9\d{9}$/;

    if (!emailPattern.test(value) && !phonePattern.test(value)) {
      setMessage("Enter a valid email or Nepali mobile number.");
      return;
    }

    if (!password) {
      setMessage("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: value,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Login failed. Please try again.");
        return;
      }

      // Temporary local-development storage.
      // We'll replace this with a safer session approach before deployment.
      sessionStorage.setItem("thriftUser", JSON.stringify(data.user));
      sessionStorage.setItem("thriftToken", data.token);

      setMessage(`Welcome back, ${data.user.name}! You're logged in.`);
    } catch {
      setMessage("Cannot connect to THRIFT. Check that the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <a className="thrift-logo" href="/">
          <span className="logo-icon">T</span>
          THRIFT
        </a>

        <p className="login-tagline">
          Good finds. New stories. A little more you.
        </p>

        <div className="login-heading">
          <p className="eyebrow">WELCOME BACK</p>
          <h1>Good to see you again.</h1>
          <p className="login-description">
            Your next favourite find is waiting for you.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email or phone number</label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Email address or mobile number"
              autoComplete="username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <div className="password-wrapper">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="show-password"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="login-options">
            <label className="remember-label">
              <input type="checkbox" />
              Remember me
            </label>

            <a href="/forgot-password">Forgot password?</a>
          </div>

          <button className="login-button" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In →"}
          </button>

          {message && (
            <p className="login-message" role="status" aria-live="polite">
              {message}
            </p>
          )}
        </form>

        <div className="login-divider">
          <span>NEW TO THRIFT?</span>
        </div>

        <p className="signup-prompt">
          Don't have an account?{" "}
          <button
            type="button"
            className="text-button"
            onClick={onCreateAccount}
          >
            Create an account
          </button>
        </p>

        <p className="login-footer">
          Discover pre-loved treasures. Give them a new story.
        </p>
      </section>
    </main>
  );
}

export default Login;

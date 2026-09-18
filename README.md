# HAWK WAF

HAWK WAF is a Python-based reverse-proxy Web Application Firewall built as a practical cybersecurity project and tested in an authorized local lab.

## Architecture

```text
Client
   |
   v
HAWK WAF :8080
   |
   +-- Website / Host Validation
   +-- Request Security
   +-- Rate Limiting
   +-- WAF Detection
   +-- Bot Detection
   +-- Browser Verification
   +-- Security Headers
   +-- Request IDs
   +-- Structured Security Logging
   |
   v
Backend :5001

Admin Dashboard :9000
```

## Detection Engine

Current configurable WAF rule families:

- SQL Injection
- Cross-Site Scripting (XSS)
- Path Traversal
- Command Injection
- Suspicious File Access
- Header Injection

Rules are loaded dynamically from `rules/rules.json` and support per-site overrides.

## Security Controls

- Multi-site host-based routing
- Per-site rate limiting
- Per-site request-size limits
- Per-site allowed HTTP methods
- Per-site upstream timeout configuration
- Bot detection
- Browser verification challenge
- Origin validation with private-network and metadata-address controls
- Security response headers
- `X-Request-ID` request correlation
- Structured JSON security events
- Authenticated administration
- PBKDF2-HMAC-SHA256 password hashing
- Failed-login rate limiting
- Admin audit logging
- Protected dashboard APIs
- Runtime configuration reload

## Security Logging

HAWK WAF generates structured JSON security events containing information such as:

- Event ID
- Request ID
- Timestamp
- Host
- Site domain
- HTTP status
- Attack type
- Request and response sizes
- Upstream latency
- Bot detection information

Example:

```json
{
  "event_id": "event-id",
  "request_id": "HAWK-REQUEST-ID",
  "host": "example.local",
  "status": 403,
  "attack_type": "XSS"
}
```

## Testing

The current automated test suite contains:

```text
Ran 13 tests
OK
```

The local lab also verifies:

- Normal requests: HTTP 200
- WAF blocks: HTTP 403
- Rate limiting: HTTP 429
- Unknown websites: HTTP 421
- Oversized requests: HTTP 413
- Disallowed HTTP methods: HTTP 405
- Bot detection and challenges
- Protected dashboard APIs: HTTP 401
- Request correlation through `X-Request-ID`

## Technology Stack

Python · Flask · Requests · Linux · JSON · Reverse Proxy · Web Application Security · HTTP Security · Rate Limiting · Bot Detection · Security Logging

## Project Structure

```text
HAWK-WAF/
├── app.py
├── config.example.json
├── requirements.txt
├── waf/
│   ├── __init__.py
│   ├── config.py
│   ├── detector.py
│   ├── logger.py
│   ├── proxy.py
│   ├── rate_limit.py
│   ├── challenge.py
│   ├── bot_detector.py
│   ├── admin.py
│   └── website_registry.py
├── dashboard/
│   ├── __init__.py
│   ├── app.py
│   └── templates/
│       ├── dashboard.html
│       ├── admin.html
│       └── admin_panel.html
├── logs/
├── rules/
│   └── rules.json
├── challenge/
│   └── challenge.html
├── tests/
│   ├── test_detector.py
│   └── test_rate_limit.py
└── README.md
```

## Configuration and Secrets

Runtime security configuration is kept separate from credentials.

Sensitive values are supplied through environment variables:

```text
HAWK_ADMIN_PASSWORD
HAWK_CHALLENGE_SECRET
```

These secrets should never be committed to GitHub.

The repository should contain `config.example.json` instead of private runtime configuration.

## Administration

HAWK WAF includes an administrative dashboard for monitoring and managing the WAF.

Administrative functionality includes:

- Authentication
- Session management
- Session expiration
- Logout
- Login rate limiting
- Audit logging
- Security statistics
- WAF events
- Configuration management
- WAF rule information

Administrative API endpoints require authentication.

## Current Deployment

The current project has been developed and tested locally using:

```text
Backend    : 127.0.0.1:5001
HAWK WAF   : 127.0.0.1:8080
Dashboard  : 127.0.0.1:9000
```

## Security Scope

HAWK WAF is intended for authorized environments and controlled security testing.

Deployment against systems without appropriate authorization is outside the intended scope.

## Future Development

Potential future development includes:

- Multi-user and multi-tenant accounts
- Per-user API keys
- Role-based access control
- Database persistence
- Production TLS deployment
- Expanded integration testing
- Production deployment architecture
- Additional detection rules
- Advanced bot verification
```

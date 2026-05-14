# Security Policy

## Supported Versions

The following versions of Idrus Men7 are currently supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | ✅ Yes             |
| < 1.0   | ❌ No              |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue, please report it responsibly.

### How to Report

1. **Do NOT** create a public GitHub issue for security vulnerabilities
2. Email the security report directly to: **abdallazeed3@gmail.com**
3. Include the following in your report:
   - Description of the vulnerability
   - Steps to reproduce the issue
   - Potential impact assessment
   - Any suggested fixes (if available)

### What to Expect

- **Response Time**: We aim to acknowledge reports within 48 hours
- **Updates**: We will keep you informed of our progress in addressing the issue
- **Credit**: With your permission, we will acknowledge your contribution in the release notes
- **Timeline**: We will work to release a patch as quickly as possible, depending on severity

### Scope

The following are considered within scope for security reports:

- Cross-Site Scripting (XSS) vulnerabilities
- Cross-Site Request Forgery (CSRF)
- Authentication or authorization bypasses
- Data exposure or information leaks
- Server-side code injection
- Any other vulnerabilities that could compromise user data or system integrity

### Out of Scope

The following are not considered security vulnerabilities:

- Social engineering attacks
- Physical security breaches
- Issues in third-party dependencies (report to their maintainers)
- Denial of Service (DoS) attacks that require significant resources

## Security Best Practices

When contributing to or using Idrus Men7:

1. **Keep dependencies updated** - Regularly run `npm audit` and update packages
2. **Never commit secrets** - Use environment variables, never hardcode API keys
3. **Validate user input** - All data from users should be validated and sanitized
4. **Use HTTPS** - Always use secure connections in production

## Security Updates

Security updates will be released as patch versions and announced in the release notes. We recommend all users to:

1. Subscribe to release notifications
2. Update to the latest version promptly
3. Review the changelog for security-related changes

---

Thank you for helping keep Idrus Men7 and its users safe!
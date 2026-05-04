# Contributing to TrustExchange

Thank you for your interest in contributing to TrustExchange! We welcome contributions from the community.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/trustexchange/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, Node version)

### Suggesting Features

1. Check existing feature requests
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Possible implementation approach

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the code style guide
   - Add tests if applicable
   - Update documentation

4. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
   
   Use conventional commits:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `refactor:` - Code refactoring
   - `test:` - Adding tests
   - `chore:` - Maintenance tasks

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Provide a clear description
   - Reference related issues
   - Include screenshots for UI changes

## Development Setup

See [DEVELOPMENT.md](DEVELOPMENT.md) for detailed setup instructions.

Quick start:
```bash
./setup.sh
docker run -d -p 27017:27017 mongo
cd backend && npm run dev  # Terminal 1
npm run dev                # Terminal 2
```

## Code Style

### TypeScript/JavaScript
- Use TypeScript for type safety
- Follow ESLint rules
- Use functional components with hooks
- Prefer async/await over promises
- Add JSDoc comments for complex functions

### Solidity
- Follow Solidity style guide
- Use latest stable version (0.8.20)
- Add NatSpec comments
- Write comprehensive tests

### CSS/Styling
- Use TailwindCSS utility classes
- Follow mobile-first approach
- Maintain consistent spacing

## Testing

### Run Tests
```bash
# Frontend tests
npm test

# Backend tests
cd backend && npm test

# Smart contract tests
cd contracts && npx hardhat test
```

### Writing Tests
- Write tests for new features
- Maintain test coverage above 80%
- Test edge cases and error scenarios

## Documentation

- Update README.md for major changes
- Add JSDoc/TSDoc comments
- Update API documentation
- Include code examples

## Review Process

1. Automated checks must pass (linting, tests)
2. Code review by maintainers
3. Address feedback and requested changes
4. Approval and merge

## Areas for Contribution

### High Priority
- [ ] Additional payment method integrations
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Performance optimizations

### Medium Priority
- [ ] Additional blockchain networks
- [ ] Enhanced analytics
- [ ] UI/UX improvements
- [ ] Documentation improvements

### Good First Issues
- [ ] Fix typos in documentation
- [ ] Add unit tests
- [ ] Improve error messages
- [ ] Add loading states

## Questions?

- Open a discussion on GitHub
- Join our Discord community
- Email: dev@trustexchange.io

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to TrustExchange! 🚀

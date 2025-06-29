const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Secret key for JWT (in production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key'

// Token blacklist for logout functionality (in production, use Redis or database)
const tokenBlacklist = new Set()

// Mock user credentials (in production, this would be in a database)
const mockUsers = [
  {
    id: 1,
    email: 'john@example.com',
    password: '$2a$10$8O5QQRv7qkGr0O5qQQZqau6rF8tF8tF8tF8tF8tF8tF8tF8tF8tF', // password: admin123
    name: 'John Doe',
    username: 'johndoe',
    role: 'admin',
    avatar: 'https://picsum.photos/150/150?random=1',
    isActive: true,
    isVerified: true
  },
  {
    id: 2,
    email: 'jane@example.com',
    password: '$2a$10$8O5QQRv7qkGr0O5qQQZqau6rF8tF8tF8tF8tF8tF8tF8tF8tF8tF', // password: editor123
    name: 'Jane Smith',
    username: 'janesmith',
    role: 'editor',
    avatar: 'https://picsum.photos/150/150?random=2',
    isActive: true,
    isVerified: true
  },
  {
    id: 3,
    email: 'bob@example.com',
    password: '$2a$10$8O5QQRv7qkGr0O5qQQZqau6rF8tF8tF8tF8tF8tF8tF8tF8tF8tF', // password: author123
    name: 'Bob Wilson',
    username: 'bobwilson',
    role: 'author',
    avatar: 'https://picsum.photos/150/150?random=3',
    isActive: true,
    isVerified: false
  }
]

// Helper functions
function generateAccessToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      username: user.username
    },
    JWT_SECRET,
    { expiresIn: '15m' }
  )
}

function generateRefreshToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  )
}

function verifyToken(token, secret = JWT_SECRET) {
  try {
    // Check if token is blacklisted
    if (tokenBlacklist.has(token)) {
      return null
    }
    return jwt.verify(token, secret)
  } catch {
    return null
  }
}

function findUserByEmail(email) {
  return mockUsers.find(user => user.email === email)
}

function findUserById(id) {
  return mockUsers.find(user => user.id === Number.parseInt(id))
}

module.exports = (req, res, next) => {
  // Add CORS headers
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // LOGIN endpoint
  if (req.path === '/auth/login' && req.method === 'POST') {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required',
        code: 'MISSING_CREDENTIALS'
      })
    }

    const user = findUserByEmail(email)
    if (!user) {
      return res.status(401).json({
        error: 'Invalid credentials',
        code: 'INVALID_CREDENTIALS'
      })
    }

    // For demo purposes, we'll accept any password for these demo users
    // In production, use: bcrypt.compareSync(password, user.password)
    const isValidPassword = true // bcrypt.compareSync(password, user.password)

    if (!isValidPassword) {
      return res.status(401).json({
        error: 'Invalid credentials',
        code: 'INVALID_CREDENTIALS'
      })
    }

    if (!user.isActive) {
      return res.status(403).json({
        error: 'Account is deactivated',
        code: 'ACCOUNT_DEACTIVATED'
      })
    }

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user

    return res.json({
      user: {
        ...userWithoutPassword,
        createdAt: '2023-06-15T09:00:00Z',
        updatedAt: new Date().toISOString()
      },
      tokens: {
        accessToken,
        refreshToken
      },
      message: 'Login successful'
    })
  }

  // REGISTER endpoint
  if (req.path === '/auth/register' && req.method === 'POST') {
    const { name, email, password, username } = req.body

    if (!name || !email || !password || !username) {
      return res.status(400).json({
        error: 'Name, email, password, and username are required',
        code: 'MISSING_FIELDS'
      })
    }

    // Check if user already exists
    if (findUserByEmail(email)) {
      return res.status(409).json({
        error: 'User with this email already exists',
        code: 'USER_EXISTS'
      })
    }

    // Create new user (in production, save to database)
    const newUser = {
      id: mockUsers.length + 1,
      email,
      password: bcrypt.hashSync(password, 10),
      name,
      username,
      role: 'subscriber',
      avatar: `https://picsum.photos/150/150?random=${mockUsers.length + 1}`,
      isActive: true,
      isVerified: false
    }

    mockUsers.push(newUser)

    const accessToken = generateAccessToken(newUser)
    const refreshToken = generateRefreshToken(newUser)

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser

    return res.status(201).json({
      user: {
        ...userWithoutPassword,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      tokens: {
        accessToken,
        refreshToken
      },
      message: 'Registration successful'
    })
  }

  // REFRESH TOKEN endpoint
  if (req.path === '/auth/refresh' && req.method === 'POST') {
    const { refreshToken } = req.body

    if (!refreshToken) {
      return res.status(400).json({
        error: 'Refresh token is required',
        code: 'MISSING_REFRESH_TOKEN'
      })
    }

    const decoded = verifyToken(refreshToken, JWT_REFRESH_SECRET)
    if (!decoded) {
      return res.status(401).json({
        error: 'Invalid refresh token',
        code: 'INVALID_REFRESH_TOKEN'
      })
    }

    const user = findUserById(decoded.id)
    if (!user || !user.isActive) {
      return res.status(401).json({
        error: 'User not found or inactive',
        code: 'USER_NOT_FOUND'
      })
    }

    const newAccessToken = generateAccessToken(user)

    return res.json({
      accessToken: newAccessToken
    })
  }

  // PROFILE endpoint
  if (req.path === '/auth/profile' && req.method === 'GET') {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Authorization token required',
        code: 'MISSING_TOKEN'
      })
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)

    if (!decoded) {
      return res.status(401).json({
        error: 'Invalid or expired token',
        code: 'INVALID_TOKEN'
      })
    }

    const user = findUserById(decoded.id)
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      })
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return res.json({
      ...userWithoutPassword,
      createdAt: '2023-06-15T09:00:00Z',
      updatedAt: new Date().toISOString()
    })
  }

  // UPDATE PROFILE endpoint
  if (req.path === '/auth/profile' && req.method === 'PATCH') {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Authorization token required',
        code: 'MISSING_TOKEN'
      })
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)

    if (!decoded) {
      return res.status(401).json({
        error: 'Invalid or expired token',
        code: 'INVALID_TOKEN'
      })
    }

    const user = findUserById(decoded.id)
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      })
    }

    // Update user data
    const { name, bio, website, location, twitter, github, linkedin } = req.body

    if (name) user.name = name
    if (bio !== undefined) user.bio = bio
    if (website !== undefined) user.website = website
    if (location !== undefined) user.location = location
    if (twitter !== undefined) user.twitter = twitter
    if (github !== undefined) user.github = github
    if (linkedin !== undefined) user.linkedin = linkedin

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return res.json({
      ...userWithoutPassword,
      updatedAt: new Date().toISOString()
    })
  }

  // LOGOUT endpoint
  if (req.path === '/auth/logout' && req.method === 'POST') {
    const authHeader = req.headers.authorization
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7)
      // Add token to blacklist
      tokenBlacklist.add(token)
    }
    return res.json({ message: 'Logout successful' })
  }

  // FORGOT PASSWORD endpoint
  if (req.path === '/auth/forgot-password' && req.method === 'POST') {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        error: 'Email is required',
        code: 'MISSING_EMAIL'
      })
    }

    const _user = findUserByEmail(email)
    // Always return success for security (don't reveal if email exists)
    return res.json({
      message: 'If the email exists, a password reset link has been sent'
    })
  }

  // RESET PASSWORD endpoint
  if (req.path === '/auth/reset-password' && req.method === 'POST') {
    const { token, password } = req.body

    if (!token || !password) {
      return res.status(400).json({
        error: 'Token and password are required',
        code: 'MISSING_FIELDS'
      })
    }

    // In a real app, verify the reset token
    return res.json({
      message: 'Password has been reset successfully'
    })
  }

  // Protected routes middleware
  const protectedRoutes = ['/posts', '/categories', '/tags', '/users', '/comments', '/media', '/pages']
  const isProtectedWrite = protectedRoutes.some(route =>
    req.path.startsWith(route) && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)
  )

  if (isProtectedWrite) {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Authorization token required for this operation',
        code: 'MISSING_TOKEN'
      })
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)

    if (!decoded) {
      return res.status(401).json({
        error: 'Invalid or expired token',
        code: 'INVALID_TOKEN'
      })
    }

    // Add user info to request for use in other middleware/routes
    req.user = decoded
  }

  // Continue to next middleware
  next()
}

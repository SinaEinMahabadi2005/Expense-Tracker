/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management APIs (Admin & Logged-in Users)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateUserRequest:
 *       type: object
 *       properties:
 *         fullName:
 *           type: string
 *           example: John Updated
 *         email:
 *           type: string
 *           format: email
 *           example: updated@example.com
 *         role:
 *           type: string
 *           enum: [admin, user]
 *           example: user
 *         isActive:
 *           type: boolean
 *           example: true
 *
 *     ChangePasswordRequest:
 *       type: object
 *       required:
 *         - oldPassword
 *         - newPassword
 *       properties:
 *         oldPassword:
 *           type: string
 *           example: old123
 *         newPassword:
 *           type: string
 *           example: new1234
 *
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: user updated successfully
 *         data:
 *           $ref: '#/components/schemas/User'
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: You don't have permission
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get one user
 *     description: Admin can get any user, normal user can get only their own profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 64a7f8e9c2d1a00012abcd34
 *     responses:
 *       200:
 *         description: User data
 *       400:
 *         description: Invalid ID or permission denied
 *       401:
 *         description: Unauthorized
 *
 *   patch:
 *     summary: Update user
 *     description: Admin can update any user except other admins. Normal users can update only their own account.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 64a7f8e9c2d1a00012abcd34
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRequest'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Validation or permission error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/users/{id}/change-password:
 *   post:
 *     summary: Change password
 *     description: Logged-in user can change their password
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 64a7f8e9c2d1a00012abcd34
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePasswordRequest'
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Validation error or incorrect old password
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * tags:
 *   - name: Transactions
 *     description: Transaction management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 66a8f1a2b3c4d56789012345
 *         categoryId:
 *           type: string
 *           example: 65a8f1a2b3c4d56789012345
 *         userId:
 *           type: string
 *           example: 64a7f8e9c2d1a00012abcd34
 *         title:
 *           type: string
 *           example: Monthly Salary
 *         note:
 *           type: string
 *           example: Company payment
 *         amount:
 *           type: number
 *           example: 5000
 *         type:
 *           type: string
 *           enum: [income, expense]
 *           example: income
 *         isPublished:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     CreateTransactionRequest:
 *       type: object
 *       required:
 *         - categoryId
 *         - title
 *         - note
 *         - amount
 *         - type
 *       properties:
 *         categoryId:
 *           type: string
 *           example: 65a8f1a2b3c4d56789012345
 *         title:
 *           type: string
 *           example: Grocery Shopping
 *         note:
 *           type: string
 *           example: Bought vegetables
 *         amount:
 *           type: number
 *           example: 150
 *         type:
 *           type: string
 *           enum: [income, expense]
 *           example: expense
 *         isPublished:
 *           type: boolean
 *           example: true
 *
 *     UpdateTransactionRequest:
 *       type: object
 *       properties:
 *         categoryId:
 *           type: string
 *         title:
 *           type: string
 *         note:
 *           type: string
 *         amount:
 *           type: number
 *         type:
 *           type: string
 *           enum: [income, expense]
 *         isPublished:
 *           type: boolean
 *
 *     TransactionSuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: transaction created successfully
 *         data:
 *           $ref: '#/components/schemas/Transaction'
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Invalid transaction id
 */

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get all transactions
 *     description: |
 *       - Admin can see all transactions  
 *       - Normal users see only published transactions  
 *       - Supports search, filter, sort, pagination
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         example: salary
 *         description: Search transaction title (case insensitive)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 10
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         example: createdAt
 *     responses:
 *       200:
 *         description: Transactions list
 *       401:
 *         description: Unauthorized
 *
 *   post:
 *     summary: Create transaction
 *     description: Create new transaction (Logged-in users only)
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTransactionRequest'
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionSuccessResponse'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/transactions/{id}:
 *   get:
 *     summary: Get one transaction
 *     description: |
 *       - Admin can get any transaction  
 *       - Normal users can get only published transactions
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 66a8f1a2b3c4d56789012345
 *     responses:
 *       200:
 *         description: Transaction data
 *       400:
 *         description: Invalid id
 *       401:
 *         description: Unauthorized
 *
 *   patch:
 *     summary: Update transaction
 *     description: Update transaction by id
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTransactionRequest'
 *     responses:
 *       201:
 *         description: Transaction updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *
 *   delete:
 *     summary: Delete transaction
 *     description: Delete transaction by id
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Transaction deleted successfully
 *       400:
 *         description: Invalid id
 *       401:
 *         description: Unauthorized
 */

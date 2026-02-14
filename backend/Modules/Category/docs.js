/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: Category management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 65a8f1a2b3c4d56789012345
 *         userId:
 *           type: string
 *           example: 64a7f8e9c2d1a00012abcd34
 *         name:
 *           type: string
 *           example: Salary
 *         icon:
 *           type: string
 *           example: salary.png
 *         color:
 *           type: string
 *           example: "#FF5733"
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
 *     CreateCategoryRequest:
 *       type: object
 *       required:
 *         - name
 *         - type
 *       properties:
 *         name:
 *           type: string
 *           example: Groceries
 *         type:
 *           type: string
 *           enum: [income, expense]
 *           example: expense
 *         icon:
 *           type: string
 *           example: groceries.png
 *         color:
 *           type: string
 *           example: "#00FF00"
 *         isPublished:
 *           type: boolean
 *           example: true
 *
 *     UpdateCategoryRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         type:
 *           type: string
 *           enum: [income, expense]
 *         icon:
 *           type: string
 *         color:
 *           type: string
 *         isPublished:
 *           type: boolean
 *
 *     CategorySuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: category created successfully
 *         data:
 *           $ref: '#/components/schemas/Category'
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: this Category contain some Transaction you can not deleted
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     description: |
 *       - Admin can see all categories  
 *       - Normal users see only published categories  
 *       - Supports search, filter, sort, pagination
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         example: sal
 *         description: Search category name (case insensitive)
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
 *         description: Categories list
 *       401:
 *         description: Unauthorized
 *
 *   post:
 *     summary: Create category
 *     description: Create new category (Logged-in users only)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategoryRequest'
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategorySuccessResponse'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Get one category
 *     description: |
 *       - Admin can get any category  
 *       - Normal users can get only published categories
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65a8f1a2b3c4d56789012345
 *     responses:
 *       200:
 *         description: Category data
 *       400:
 *         description: Invalid id
 *       401:
 *         description: Unauthorized
 *
 *   patch:
 *     summary: Update category
 *     description: Update category by id
 *     tags: [Categories]
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
 *             $ref: '#/components/schemas/UpdateCategoryRequest'
 *     responses:
 *       201:
 *         description: Category updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *
 *   delete:
 *     summary: Delete category
 *     description: |
 *       Cannot delete category if it contains transactions
 *     tags: [Categories]
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
 *         description: Category deleted successfully
 *       400:
 *         description: Category contains transactions
 *       401:
 *         description: Unauthorized
 */

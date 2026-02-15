/**
 * @swagger
 * tags:
 *   name: Budgets
 *   description: Budget management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *
 *     Budget:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "64b123abc456def789012345"
 *         categoryId:
 *           type: string
 *           example: "64b123abc456def789099999"
 *         userId:
 *           type: string
 *           example: "64b123abc456def789011111"
 *         month:
 *           type: string
 *           enum:
 *             - January
 *             - February
 *             - March
 *             - April
 *             - May
 *             - June
 *             - July
 *             - August
 *             - September
 *             - October
 *             - November
 *             - December
 *           example: "January"
 *         year:
 *           type: string
 *           example: "2025"
 *         amount:
 *           type: number
 *           example: 1500
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
 *     BudgetCreateInput:
 *       type: object
 *       required:
 *         - categoryId
 *         - month
 *         - year
 *         - amount
 *       properties:
 *         categoryId:
 *           type: string
 *           example: "64b123abc456def789099999"
 *         month:
 *           type: string
 *           enum:
 *             - January
 *             - February
 *             - March
 *             - April
 *             - May
 *             - June
 *             - July
 *             - August
 *             - September
 *             - October
 *             - November
 *             - December
 *         year:
 *           type: string
 *           example: "2025"
 *         amount:
 *           type: number
 *           example: 2000
 *         isPublished:
 *           type: boolean
 *           example: true
 *
 *     BudgetUpdateInput:
 *       type: object
 *       properties:
 *         categoryId:
 *           type: string
 *         month:
 *           type: string
 *         year:
 *           type: string
 *         amount:
 *           type: number
 *         isPublished:
 *           type: boolean
 *
 *     BudgetSuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "budget created successfully"
 *         data:
 *           $ref: "#/components/schemas/Budget"
 *
 *     BudgetListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         results:
 *           type: number
 *           example: 2
 *         pagination:
 *           type: object
 *         data:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Budget"
 */




/**
 * @swagger
 * /api/budgets:
 *   get:
 *     summary: Get all budgets
 *     tags: [Budgets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: month
 *         schema:
 *           type: string
 *         description: Filter by month
 *       - in: query
 *         name: year
 *         schema:
 *           type: string
 *         description: Filter by year
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page
 *     responses:
 *       200:
 *         description: List of budgets
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BudgetListResponse"
 *       401:
 *         description: Unauthorized
 */


/**
 * @swagger
 * /api/budgets/{id}:
 *   get:
 *     summary: Get single budget
 *     tags: [Budgets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Budget ID
 *     responses:
 *       200:
 *         description: Single budget data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BudgetListResponse"
 *       404:
 *         description: Budget not found
 *       401:
 *         description: Unauthorized
 */


/**
 * @swagger
 * /api/budgets:
 *   post:
 *     summary: Create new budget
 *     tags: [Budgets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/BudgetCreateInput"
 *     responses:
 *       201:
 *         description: Budget created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BudgetSuccessResponse"
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */


/**
 * @swagger
 * /api/budgets/{id}:
 *   patch:
 *     summary: Update budget
 *     tags: [Budgets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Budget ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/BudgetUpdateInput"
 *     responses:
 *       200:
 *         description: Budget updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BudgetSuccessResponse"
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */


/**
 * @swagger
 * /api/budgets/{id}:
 *   delete:
 *     summary: Delete budget
 *     tags: [Budgets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Budget ID
 *     responses:
 *       200:
 *         description: Budget deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BudgetSuccessResponse"
 *       401:
 *         description: Unauthorized
 */

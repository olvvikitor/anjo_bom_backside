import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import multer from 'multer';
import upload from '@config/upload';
import { auth } from '@shared/infra/http/middleweres/auth';
import AdministratorController from '../controllers/AdministratorController';
import ProductController from '@modules/products/infra/http/controllers/ProductController';
import CollectionPointController from '@modules/collectionPoints/infra/http/controllers/CollectionPointController';



const adminRouter = Router();
// adminRouter.use(auth);
const adminController = new AdministratorController();
const productController = new ProductController();
const collectionPointController = new CollectionPointController();


//JSDOC PARA A CRIAÇÂO DE UM NOVO ADMIN
/**
 * @swagger
 * http://localhost:5000/admin/:
 *   post:
 *     summary: Cria um novo administrador
 *     description: Endpoint para criar um novo administrador no sistema. Requer autenticação com um token Bearer.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Administrador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do administrador.
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do administrador.
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: Senha do administrador.
 *                 example: Password123
 *               role:
 *                 type: string
 *                 enum: [admin, superadmin]
 *                 description: Papel do administrador.
 *                 example: admin
 *     responses:
 *       201:
 *         description: Administrador criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID do administrador criado.
 *                   example: "605c72ef4f1f4b4d12a2e5f0"
 *                 name:
 *                   type: string
 *                   description: Nome do administrador.
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: Email do administrador.
 *                   example: john.doe@example.com
 *       400:
 *         description: Requisição inválida, parâmetros obrigatórios ausentes ou inválidos.
 *       401:
 *         description: Não autorizado, token de autenticação ausente ou inválido.
 *       500:
 *         description: Erro interno do servidor.
 *     headers:
 *       Authorization:
 *         description: Token JWT necessário para autenticação.
 *         schema:
 *           type: string
 *           example: "Bearer <seu-token-aqui>"
 */
adminRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),

  }}),adminController.createAdministrator);

adminRouter.get('/admin//show-all', adminController.showAll);

//JSDOC REVOGUE ACTIVATION
/**
 * @swagger
 * http://localhost:5000/admin/revogue/{id}:
 *   put:
 *     summary: Inativa um administrador
 *     description: Endpoint para inativar um administrador existente no sistema. Requer autenticação com token Bearer.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Administrador
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do administrador que será inativado.
 *     responses:
 *       200:
 *         description: Administrador inativado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso.
 *                   example: Administrador inativado com sucesso.
 *       400:
 *         description: Requisição inválida ou parâmetros obrigatórios ausentes.
 *       401:
 *         description: Não autorizado, falha na autenticação.
 *       404:
 *         description: Administrador não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
adminRouter.put('/revogue/:id', adminController.revogueAdmin);

//JSDOC PARA A CONSULTA DE TODOS OS ADMINIS
/**
     * @swagger
     * http://localhost:5000/admin/show-all:
     *   get:
     *     summary: Recupera todos os administradores com status ativo
     *     description: Esta rota recupera todos os administradores ativos no sistema. Requer autenticação com um token Bearer.
     *     security:
     *       - bearerAuth: []
     *     tags:
     *       - Administrador
     *     responses:
     *       200:
     *         description: Lista de administradores ativos recuperada com sucesso.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   _id:
     *                     type: string
     *                     description: Identificador único do administrador.
     *                     example: "66dbf6aa5904b4954bddc1b6"
     *                   name:
     *                     type: string
     *                     description: Nome do administrador.
     *                     example: "João Victor"
     *                   email:
     *                     type: string
     *                     format: email
     *                     description: Email do administrador.
     *                     example: "victor@gmail.com"
     *                   isActive:
     *                     type: boolean
     *                     description: Indica se o administrador está ativo.
     *                     example: true
     *                   created_at:
     *                     type: string
     *                     format: date-time
     *                     description: Data e hora em que o administrador foi criado.
     *                     example: "2024-09-07T06:46:02.613Z"
     *                   updated_at:
     *                     type: string
     *                     format: date-time
     *                     description: Data e hora da última atualização do administrador.
     *                     example: "2024-09-07T06:46:02.613Z"
     *                   __v:
     *                     type: integer
     *                     description: Versão do documento no banco de dados.
     *                     example: 0
     *       401:
     *         description: Não autorizado, token de autenticação ausente ou inválido.
     *       500:
     *         description: Erro interno do servidor.
     *     headers:
     *       authorization:
     *         description: Token JWT necessário para autenticação.
     *         schema:
     *           type: string
     *           example: "Bearer <seu-token-aqui>"
     */
adminRouter.get('/show-donors', adminController.getAllDonors);

//JSDOC PARA A EXIBIÇÃO DE TODAS AS DOAÇÕES PIX
/**
 * @swagger
 * http://localhost:5000/admin/show-donates:
 *   get:
 *     summary: Exibe todas as doações aprovadas
 *     description: Recupera uma lista de todas as doações que foram aprovadas. Requer autenticação Bearer token.
 *     tags:
 *       - Administrador
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de doações aprovadas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID da doação.
 *                   donorName:
 *                     type: string
 *                     description: Nome do doador.
 *                   amount:
 *                     type: number
 *                     description: Valor da doação.
 *                   status:
 *                     type: string
 *                     description: Status da doação (aprovado).
 *                     example: aprovado
 *       401:
 *         description: Não autorizado, token de autenticação inválido ou ausente.
 *       500:
 *         description: Erro interno no servidor.
 */
adminRouter.get('/show-donates', adminController.findAllDonatesApproved)

//JSDOC PARA A CRIAÇÂO DE UM  EVENTO
/**
 * @swagger
 * http://localhost:5000/admin/create-evento:
 *   post:
 *     summary: Cria um novo evento
 *     description: Cria um novo evento com título, descrição, endereço, datas e fotos associadas. Requer autenticação Bearer token.
 *     tags:
 *       - Administrador
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: O título do evento.
 *                 example: Meu Evento
 *               descricao:
 *                 type: string
 *                 description: A descrição do evento.
 *                 example: Este é um evento incrível
 *               address:
 *                 type: string
 *                 description: O endereço do evento no formato JSON string.
 *                 example: '{"cep": "12345-678", "estado": "SP", "cidade": "São Paulo", "bairro": "Centro", "rua": "Avenida Paulista", "numero": "1000"}'
 *               data_inicio:
 *                 type: string
 *                 format: date-time
 *                 description: Data de início do evento no formato ISO.
 *                 example: 2024-09-01T10:00:00
 *               data_fim:
 *                 type: string
 *                 format: date-time
 *                 description: Data de fim do evento no formato ISO.
 *                 example: 2024-09-01T18:00:00
 *               photos_event:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Arquivos de fotos associados ao evento.
 *     responses:
 *       201:
 *         description: Evento criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: O ID do evento criado.
 *                 titulo:
 *                   type: string
 *                   description: O título do evento.
 *                 descricao:
 *                   type: string
 *                   description: A descrição do evento.
 *                 address:
 *                   type: object
 *                   description: O endereço do evento.
 *                   properties:
 *                     cep:
 *                       type: string
 *                     estado:
 *                       type: string
 *                     cidade:
 *                       type: string
 *                     bairro:
 *                       type: string
 *                     rua:
 *                       type: string
 *                     numero:
 *                       type: string
 *                 data_inicio:
 *                   type: string
 *                   format: date-time
 *                   description: Data de início do evento.
 *                 data_fim:
 *                   type: string
 *                   format: date-time
 *                   description: Data de fim do evento.
 *       400:
 *         description: Erro na validação dos dados.
 *       401:
 *         description: Não autorizado, token de autenticação inválido ou ausente.
 *       500:
 *         description: Erro interno no servidor.
 */
const uploader = multer(upload)
adminRouter.post('/create-evento' ,uploader.array('photos_event'), 
adminController.createEvento);

//JSDOC PARA A EXCLUSÃO DE UM EVENTO
/**
 * @swagger
 * http://localhost:5000/admin/delete-event/{id}:
 *   delete:
 *     summary: Deleta um evento
 *     description: Remove um evento específico baseado no ID fornecido. Requer autenticação Bearer token.
 *     tags:
 *       - Administrador
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: O ID do evento a ser deletado.
 *     responses:
 *       200:
 *         description: Evento deletado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Evento deletado com sucesso.
 *       400:
 *         description: Erro ao deletar o evento, ID inválido.
 *       401:
 *         description: Não autorizado, token de autenticação inválido ou ausente.
 *       404:
 *         description: Evento não encontrado.
 *       500:
 *         description: Erro interno no servidor.
 */
adminRouter.delete('/delete-event/:id', adminController.deleteEvento)

//JSDOC PARA A CRIAÇÂO DE UM PRODUCT
adminRouter.post('/create-product', productController.createProduct)

adminRouter.put('/update-products/:id', productController.updateProduct)

//JSDOC PARA A CRIAÇÂO DE UM  PONTO DE COLETA
/**
 * @swagger
 * http://localhost:5000/admin/create-collectionPoint:
 *   post:
 *     summary: Cria um novo ponto de coleta
 *     description: Cria um novo ponto de coleta com nome, e endereço. Requer autenticação Bearer token.
 *     tags:
 *       - Administrador
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: O nome do local.
 *                 example: Atacadão
 *               address:
 *                 type: string
 *                 description: O endereço do evento no formato JSON string.
 *                 example: '{"cep": "12345-678", "estado": "SP", "cidade": "São Paulo", "bairro": "Centro", "rua": "Avenida Paulista", "numero": "1000"}'
 *     responses:
 *       201:
 *         description: ponto de coleta criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: O ID do ponto de coleta criado.
 *                 address:
 *                   type: object
 *                   description: O endereço do evento.
 *                   properties:
 *                     cep:
 *                       type: string
 *                     estado:
 *                       type: string
 *                     cidade:
 *                       type: string
 *                     bairro:
 *                       type: string
 *                     rua:
 *                       type: string
 *                     numero:
 *                       type: string
 *       400:
 *         description: Erro na validação dos dados.
 *       401:
 *         description: Não autorizado, token de autenticação inválido ou ausente.
 *       500:
 *         description: Erro interno no servidor.
 */
adminRouter.post('/create-collectionPoint', collectionPointController.createCollectionPoint);

//JSDOC PARA A EXIBIÇÃO DE TODOS OS PONTOS DE COLETA
/**
 * @swagger
 * http://localhost:5000/admin/show-collectionPoints:
 *   get:
 *     summary: Exibe todos os pontos de coleta
 *     description: Recupera uma lista de todos os pontos de coleta.
 *     tags:
 *       - Administrador
 *     responses:
 *       200:
 *         description: Lista de todos os pontos de coleta.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  name:
 *                   type: string
 *                   description: Nome do local
 *                  address:
 *                    type: object
 *                    properties:
 *                     cep:
 *                       type: string
 *                     estado:
 *                       type: string
 *                     cidade:
 *                       type: string
 *                     bairro:
 *                       type: string
 *                     rua:
 *                       type: string
 *                     numero:
 *                       type: string
 *       500:
 *         description: Erro interno no servidor.
 */
adminRouter.get('/find-collectionPoints', collectionPointController.getAllCollectionPoints);

export default adminRouter;









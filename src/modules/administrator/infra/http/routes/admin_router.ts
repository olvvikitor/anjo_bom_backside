import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import multer from 'multer';
import upload from '@config/upload';
import { auth } from '@shared/infra/http/middleweres/auth';
import AdministratorController from '../controllers/AdministratorController';
import ProductController from '@modules/products/infra/http/controllers/ProductController';
import CollectionPointController from '@modules/collectionPoints/infra/http/controllers/CollectionPointController';
import EventController from '@modules/eventos/infra/http/controllers/EventController';
import e from 'cors';
import PersonConroller from '@modules/donor/infra/http/controllers/PersonController';
import DonatesController from '@modules/donates/infra/http/controllers/DonatesController';



const adminRouter = Router();
// adminRouter.use(auth);
const adminController = new AdministratorController();
const productController = new ProductController();
const collectionPointController = new CollectionPointController();
const eventoController = new EventController();
const personController = new PersonConroller()
const donatesPixController = new DonatesController();

//JSDOC PARA A CRIAÇÂO DE UM NOVO ADMIN
/**
 * @swagger
    /admin/:
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

//JSDOC PARA A CONSULTA DE TODOS OS ADMINIS
/**
 * @swagger
 *    /admin/mostrarAdmins:
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
adminRouter.get('/admin/mostrarAdmins', adminController.showAll);

//JSDOC REVOGUE ADMIN
/**
 * @swagger
 * /admin/revogarAcesso/{id}:
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
adminRouter.put('/revogarAcesso/:id', adminController.revogueAdmin);

/**
 * @swagger
 * /admin/mostrarDoadores:
 *   get:
 *     summary: Recupera todos os doadores
 *     description: Esta rota recupera todos os doadores ativos no sistema. Requer autenticação com um token Bearer.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Administrador
 *     parameters:
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Número de doadores por página.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Página atual a ser retornada.
 *     responses:
 *       200:
 *         description: Lista de doadores ativos recuperada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Identificador único do doador.
 *                     example: "66dbf6aa5904b4954bddc1b6"
 *                   name:
 *                     type: string
 *                     description: Nome do doador.
 *                     example: "Pedro Paulo"
 *                   last_name:
 *                     type: string
 *                     description: Sobrenome do doador.
 *                     example: "Silva"
 *                   email:
 *                     type: string
 *                     format: email
 *                     description: Email do doador.
 *                     example: "Pedro@gmail.com"
 *                   phone:
 *                     type: string
 *                     description: Telefone do doador.
 *                     example: "313"
 *                   motivation:
 *                     type: string
 *                     description: Motivação do doador.
 *                     example: "Ajudar pessoas necessitadas"
 *                   isActive:
 *                     type: boolean
 *                     description: Indica se o doador está ativo.
 *                     example: true
 *                   address:
 *                     type: object
 *                     description: Endereço do doador.
 *                     properties:
 *                       cep:
 *                         type: string
 *                         description: O CEP do endereço.
 *                         example: "44444-444"
 *                       estado:
 *                         type: string
 *                         description: O estado do endereço.
 *                         example: "BA"
 *                       cidade:
 *                         type: string
 *                         description: A cidade do endereço.
 *                         example: "Santo Antônio de Jesus"
 *                       bairro:
 *                         type: string
 *                         description: O bairro do endereço.
 *                         example: "Nossa Senhora das Graças"
 *                       rua:
 *                         type: string
 *                         description: A rua do endereço.
 *                         example: "Rua Via Coletora B"
 *                       numero:
 *                         type: string
 *                         description: O número do endereço.
 *                         example: "12"
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
adminRouter.get('/mostrarDoadores', personController.getAllDonors);

//JSDOC PARA A EXIBIÇÃO DE TODAS AS DOAÇÕES PIX
/*
 * @swagger
 *  /admin/mostrarDoacoesPix/:
 *   get:
 *     summary: Exibe todas as doações aprovadas
 *     description: Recupera uma lista de todas as doações que foram aprovadas. Requer autenticação Bearer token.
 *     tags:
 *       - Administrador
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: Número da página a ser recuperada (início em 1).
 *         schema:
 *           type: integer
 *           default: 1
 *           example: 2
 *       - in: query
 *         name: perPage
 *         required: false
 *         description: Número máximo de doações a serem retornadas por página.
 *         schema:
 *           type: integer
 *           default: 10
 *           example: 5
 *     responses:
 *       200:
 *         description: Lista de doações aprovadas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: integer
 *                   description: Página atual da lista de doações.
 *                   example: 2
 *                 totalPages:
 *                   type: integer
 *                   description: Número total de páginas disponíveis.
 *                   example: 5
 *                 totalDonations:
 *                   type: integer
 *                   description: Total de doações aprovadas.
 *                   example: 50
 *                 donations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: ID da doação.
 *                         example: "60d5f4842f8fb63a1c0a6b1f"
 *                       donorName:
 *                         type: string
 *                         description: Nome do doador.
 *                         example: "João da Silva"
 *                       amount:
 *                         type: number
 *                         description: Valor da doação.
 *                         example: 100.00
 *                       status:
 *                         type: string
 *                         description: Status da doação (aprovado).
 *                         example: "aprovado"
 *       401:
 *         description: Não autorizado, token de autenticação inválido ou ausente.
 *       500:
 *         description: Erro interno no servidor.
 */
adminRouter.get('/mostrarDoacoesPix', donatesPixController.findAllDonatesApproved)

//JSDOC PARA A CRIAÇÂO DE UM  EVENTO
/**
 * @swagger
 *  admin/criarEvento:
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
adminRouter.post('/criarEvento' ,uploader.array('photos_event'), 
eventoController.createEvento);

//JSDOC PARA A EXCLUSÃO DE UM EVENTO
/**
 * @swagger
 *  /admin/deletarEvento/{id}:
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
adminRouter.delete('/delete-event/:id', eventoController.deleteEvento)

adminRouter.get('/buscarTodosEventos', eventoController.getEvents);

//JSDOC PARA A CRIAÇÂO DE UM PRODUCT
/**
 * @swagger
 * /admin/criarProduto:
 *   post:
 *     summary: Cria um novo produto
 *     description: Endpoint para criar um novo produto com nome e nível de necessidade. Requer autenticação com um token Bearer.
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
 *                 description: Nome do produto a ser criado.
 *                 example: "Brinquedo2erssssp"
 *               requirement:
 *                 type: string
 *                 enum: [CRITICO, ALTO, MEDIO, BAIXO]
 *                 description: Nível de necessidade do produto.
 *                 example: "CRITICO"
 *     responses:
 *       201:
 *         description: Produto criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID do produto criado.
 *                   example: "66dbf6aa5904b4954bddc1b6"
 *                 name:
 *                   type: string
 *                   description: Nome do produto criado.
 *                   example: "Brinquedo"
 *                 requirement:
 *                   type: string
 *                   description: Nível de necessidade do produto.
 *                   example: "CRITICO"
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: Data e hora da criação do produto.
 *                   example: "2024-10-03T06:46:02.613Z"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   description: Data e hora da última atualização do produto.
 *                   example: "2024-10-03T06:46:02.613Z"
 *       400:
 *         description: Requisição inválida, parâmetros obrigatórios ausentes ou inválidos.
 *       401:
 *         description: Não autorizado, token de autenticação ausente ou inválido.
 *       500:
 *         description: Erro interno do servidor.
 *       409:
 *         description: Já existe um produto com esse nome
 *     headers:
 *       authorization:
 *         description: Token JWT necessário para autenticação.
 *         schema:
 *           type: string
 *           example: "Bearer <seu-token-aqui>"
 */
adminRouter.post('/criarProduto', productController.createProduct)

//JSDOC PARA ATUALIZAR NIVEL DE CARENCIA DE UM PRODUTO
/**
 * @swagger
 * /admin/atualizarProduto/{id}:
 *   put:
 *     summary: Atualiza um produto existente
 *     description: Atualiza o nível de necessidade de um produto. Requer autenticação com um token Bearer.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Administrador
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do produto a ser atualizado.
 *         schema:
 *           type: string
 *           example: "66dbf6aa5904b4954bddc1b6"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               requirement:
 *                 type: string
 *                 enum: [CRITICO, ALTO, MEDIO, BAIXO]
 *                 description: Novo nível de necessidade do produto.
 *                 example: "MEDIO"
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID do produto atualizado.
 *                   example: "66dbf6aa5904b4954bddc1b6"
 *                 name:
 *                   type: string
 *                   description: Nome do produto.
 *                   example: "Brinquedo"
 *                 requirement:
 *                   type: string
 *                   description: Novo nível de necessidade do produto.
 *                   example: "MEDIO"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   description: Data e hora da última atualização do produto.
 *                   example: "2024-10-03T06:46:02.613Z"
 *       400:
 *         description: Requisição inválida, parâmetros obrigatórios ausentes ou inválidos.
 *       401:
 *         description: Não autorizado, token de autenticação ausente ou inválido.
 *       404:
 *         description: Produto não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 *     headers:
 *       authorization:
 *         description: Token JWT necessário para autenticação.
 *         schema:
 *           type: string
 *           example: "Bearer <seu-token-aqui>"
 */
adminRouter.put('/atualizarProduto/:id', productController.updateProduct)

//JSDOC PARA A CRIAÇÂO DE UM  PONTO DE COLETA
/**
 * @swagger
 * /admin/criarPontoDeColeta:
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
adminRouter.post('/criarPontoDeColeta', collectionPointController.createCollectionPoint);

//JSDOC PARA A EXIBIÇÃO DE TODOS OS PONTOS DE COLETA
/**
 * @swagger
 *  /admin/buscarPontosDeColeta:
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
adminRouter.get('/buscarPontosDeColeta', collectionPointController.getAllCollectionPoints);

//JSDOC PARA A EXCLUSÃO DE UM EVENTO
/**
 * @swagger
 *  /admin/deletarPontoDeColeta/{id}:
 *   delete:
 *     summary: Deleta um Ponto de coleta
 *     description: Remove um Ponto de coleta específico baseado no ID fornecido. Requer autenticação Bearer token.
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
 *         description: O ID do Ponto de coleta a ser deletado.
 *     responses:
 *       200:
 *         description: Ponto de coleta deletado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Evento deletado com sucesso.
 *       400:
 *         description: Erro ao deletar o Ponto de coleta, ID inválido.
 *       401:
 *         description: Não autorizado, token de autenticação inválido ou ausente.
 *       404:
 *         description: Ponto de coleta não encontrado.
 *       500:
 *         description: Erro interno no servidor.
 */
adminRouter.delete('/deletarPontoDeColeta/:id', collectionPointController.deleteCollectionPoints);


export default adminRouter;









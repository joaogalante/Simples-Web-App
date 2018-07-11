/*
 Navicat PostgreSQL Data Transfer

 Source Server         : Local Dev
 Source Server Type    : PostgreSQL
 Source Server Version : 100001
 Source Host           : localhost:5432
 Source Catalog        : simples
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 100001
 File Encoding         : 65001

 Date: 01/04/2018 16:45:22
*/


-- ----------------------------
-- Type structure for entitytype
-- ----------------------------
DROP TYPE IF EXISTS "public"."entitytype";
CREATE TYPE "public"."entitytype" AS ENUM (
  'legal',
  'individual'
);

-- ----------------------------
-- Type structure for participationtype
-- ----------------------------
DROP TYPE IF EXISTS "public"."participationtype";
CREATE TYPE "public"."participationtype" AS ENUM (
  'shareholder',
  'administrator',
  'both'
);

-- ----------------------------
-- Type structure for shareholdertype
-- ----------------------------
DROP TYPE IF EXISTS "public"."shareholdertype";
CREATE TYPE "public"."shareholdertype" AS ENUM (
  'entity',
  'circulation',
  'unidentified',
  'open'
);

-- ----------------------------
-- Type structure for shareholdertypeenum
-- ----------------------------
DROP TYPE IF EXISTS "public"."shareholdertypeenum";
CREATE TYPE "public"."shareholdertypeenum" AS ENUM (
  'entity',
  'treasury',
  'circulation',
  'unidentified',
  'open'
);

-- ----------------------------
-- Sequence structure for address_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."address_id_seq";
CREATE SEQUENCE "public"."address_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for addressaudit_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."addressaudit_id_seq";
CREATE SEQUENCE "public"."addressaudit_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for appuser_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."appuser_id_seq";
CREATE SEQUENCE "public"."appuser_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for control_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."control_id_seq";
CREATE SEQUENCE "public"."control_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for country_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."country_id_seq";
CREATE SEQUENCE "public"."country_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for entity_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."entity_id_seq";
CREATE SEQUENCE "public"."entity_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for entityaudit_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."entityaudit_id_seq";
CREATE SEQUENCE "public"."entityaudit_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for goose_db_version_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."goose_db_version_id_seq";
CREATE SEQUENCE "public"."goose_db_version_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for mention_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."mention_id_seq";
CREATE SEQUENCE "public"."mention_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for participation_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."participation_id_seq";
CREATE SEQUENCE "public"."participation_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for participationaudit_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."participationaudit_id_seq";
CREATE SEQUENCE "public"."participationaudit_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS "public"."address";
CREATE TABLE "public"."address" (
  "id" int4 NOT NULL DEFAULT nextval('address_id_seq'::regclass),
  "name" text COLLATE "pg_catalog"."default",
  "num" text COLLATE "pg_catalog"."default",
  "complement" text COLLATE "pg_catalog"."default",
  "postal" text COLLATE "pg_catalog"."default",
  "region" text COLLATE "pg_catalog"."default",
  "city" text COLLATE "pg_catalog"."default",
  "state" text COLLATE "pg_catalog"."default",
  "createdat" timestamptz(6) NOT NULL DEFAULT now(),
  "updatedat" timestamptz(6) NOT NULL DEFAULT now(),
  "deleted" bool NOT NULL DEFAULT false,
  "version" int4 DEFAULT 1
)
;
ALTER TABLE "public"."address" OWNER TO "yaiebczsrnzufv";

-- ----------------------------
-- Records of address
-- ----------------------------
BEGIN;
INSERT INTO "public"."address" VALUES (1, 'Av Brigadeiro Faria Lima', '1384', 'Andar 4 - Parte A', '01.451-001', 'Jardim Paulistano', 'Sao Paulo', 'SP', '2018-03-27 17:04:25.287913+01', '2018-03-27 17:04:25.287913+01', 'f', 1);
INSERT INTO "public"."address" VALUES (2, 'Av Brigadeiro Faria Lima', '1384', 'Andar 6', '01.451-001', 'Jardim Paulistano', 'Sao Paulo', 'SP', '2018-03-27 17:04:41.720689+01', '2018-03-27 17:04:41.720689+01', 'f', 1);
INSERT INTO "public"."address" VALUES (3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2018-03-27 17:05:05.848175+01', '2018-03-27 17:05:05.848175+01', 'f', 1);
COMMIT;

-- ----------------------------
-- Table structure for addressaudit
-- ----------------------------
DROP TABLE IF EXISTS "public"."addressaudit";
CREATE TABLE "public"."addressaudit" (
  "id" int4 NOT NULL DEFAULT nextval('addressaudit_id_seq'::regclass),
  "stamp" timestamp(6),
  "mainrowid" int4 NOT NULL,
  "name" text COLLATE "pg_catalog"."default",
  "num" text COLLATE "pg_catalog"."default",
  "complement" text COLLATE "pg_catalog"."default",
  "postal" text COLLATE "pg_catalog"."default",
  "region" text COLLATE "pg_catalog"."default",
  "city" text COLLATE "pg_catalog"."default",
  "state" text COLLATE "pg_catalog"."default",
  "createdat" timestamptz(6) NOT NULL,
  "updatedat" timestamptz(6) NOT NULL,
  "deleted" bool NOT NULL DEFAULT false,
  "version" int4 NOT NULL DEFAULT 1
)
;
ALTER TABLE "public"."addressaudit" OWNER TO "yaiebczsrnzufv";

-- ----------------------------
-- Table structure for appuser
-- ----------------------------
DROP TABLE IF EXISTS "public"."appuser";
CREATE TABLE "public"."appuser" (
  "id" int4 NOT NULL DEFAULT nextval('appuser_id_seq'::regclass),
  "name" text COLLATE "pg_catalog"."default" NOT NULL,
  "email" text COLLATE "pg_catalog"."default" NOT NULL,
  "token" text COLLATE "pg_catalog"."default",
  "pass" text COLLATE "pg_catalog"."default",
  "createdat" timestamptz(6) NOT NULL DEFAULT now(),
  "updatedat" timestamptz(6) NOT NULL DEFAULT now()
)
;
ALTER TABLE "public"."appuser" OWNER TO "yaiebczsrnzufv";

-- ----------------------------
-- Records of appuser
-- ----------------------------
BEGIN;
INSERT INTO "public"."appuser" VALUES (2, 'João Galante', 'joao.galante@gmail.com', NULL, '$2a$04$vOwmxkqoCP6Fb7EQ9jk8buZAwaYGXZAdYmE2nX14cb5tWrGKtZJTy', '2018-01-14 23:08:47.985987+00', '2018-03-14 14:44:21.567603+00');
INSERT INTO "public"."appuser" VALUES (1, 'Chris', 'chris@cinn.io', NULL, '$2a$04$ucKwOABe0ierTapt9Aq62eu/p5IEiGbOON4xj0zWTZMNwx8NPJcIS', '2018-01-14 23:08:47.985987+00', '2018-03-17 17:08:33.350146+00');
COMMIT;

-- ----------------------------
-- Table structure for control
-- ----------------------------
DROP TABLE IF EXISTS "public"."control";
CREATE TABLE "public"."control" (
  "id" int4 NOT NULL DEFAULT nextval('control_id_seq'::regclass),
  "num" text COLLATE "pg_catalog"."default" NOT NULL,
  "cost" text COLLATE "pg_catalog"."default",
  "legalentityid" int4 NOT NULL,
  "requestdate" date NOT NULL,
  "deliverydate" date NOT NULL,
  "token" text COLLATE "pg_catalog"."default" NOT NULL,
  "open" bool,
  "createdat" timestamptz(6) NOT NULL DEFAULT now(),
  "updatedat" timestamptz(6) NOT NULL DEFAULT now(),
  "instancedate" timestamp(6) NOT NULL DEFAULT now()
)
;
ALTER TABLE "public"."control" OWNER TO "yaiebczsrnzufv";

-- ----------------------------
-- Records of control
-- ----------------------------
BEGIN;
INSERT INTO "public"."control" VALUES (1, 'RN0232', '321321-321', 1, '2018-03-27', '2018-03-27', 'e7f30683-c7b4-4750-9603-6337cb059a5f', 'f', '2018-03-27 17:08:06.741372+01', '2018-03-31 14:56:24.623203+01', '2018-03-31 14:56:24.623203');
COMMIT;

-- ----------------------------
-- Table structure for country
-- ----------------------------
DROP TABLE IF EXISTS "public"."country";
CREATE TABLE "public"."country" (
  "id" int4 NOT NULL DEFAULT nextval('country_id_seq'::regclass),
  "name" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "namept" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "code" varchar COLLATE "pg_catalog"."default",
  "bacen" int4,
  "sort" int4
)
;
ALTER TABLE "public"."country" OWNER TO "yaiebczsrnzufv";

-- ----------------------------
-- Records of country
-- ----------------------------
BEGIN;
INSERT INTO "public"."country" VALUES (1, 'Brazil', 'Brasil', 'BR', 1058, 5);
INSERT INTO "public"."country" VALUES (2, 'Afghanistan', 'Afeganistão', 'AF', 132, 1);
INSERT INTO "public"."country" VALUES (3, 'Albania', 'Albânia, Republica da', 'AL', 175, 0);
INSERT INTO "public"."country" VALUES (4, 'Algeria', 'Argélia', 'DZ', 590, 0);
INSERT INTO "public"."country" VALUES (5, 'American Samoa', 'Samoa Americana', 'AS', 6912, 0);
INSERT INTO "public"."country" VALUES (6, 'Andorra', 'Andorra', 'AD', 370, 0);
INSERT INTO "public"."country" VALUES (7, 'Angola', 'Angola', 'AO', 400, 1);
INSERT INTO "public"."country" VALUES (8, 'Anguilla', 'Anguilla', 'AI', 418, 0);
INSERT INTO "public"."country" VALUES (9, 'Antarctica', 'Antártida', 'AQ', 3596, 0);
INSERT INTO "public"."country" VALUES (10, 'Antigua and Barbuda', 'Antigua e Barbuda', 'AG', 434, 0);
INSERT INTO "public"."country" VALUES (11, 'Argentina', 'Argentina', 'AR', 639, 4);
INSERT INTO "public"."country" VALUES (12, 'Armenia', 'Armênia, Republica da', 'AM', 647, 0);
INSERT INTO "public"."country" VALUES (13, 'Aruba', 'Aruba', 'AW', 655, 0);
INSERT INTO "public"."country" VALUES (14, 'Australia', 'Austrália', 'AU', 698, 3);
INSERT INTO "public"."country" VALUES (15, 'Austria', 'Áustria', 'AT', 728, 3);
INSERT INTO "public"."country" VALUES (16, 'Azerbaijan', 'Azerbaijão, Republica do', 'AZ', 736, 0);
INSERT INTO "public"."country" VALUES (17, 'Bahamas', 'Bahamas, Ilhas', 'BS', 779, 0);
INSERT INTO "public"."country" VALUES (18, 'Bahrain', 'Bahrein, Ilhas', 'BH', 809, 0);
INSERT INTO "public"."country" VALUES (19, 'Bangladesh', 'Bangladesh', 'BD', 817, 0);
INSERT INTO "public"."country" VALUES (20, 'Barbados', 'Barbados', 'BB', 833, 0);
INSERT INTO "public"."country" VALUES (21, 'Belarus', 'Belarus, Republica da', 'BY', 850, 0);
INSERT INTO "public"."country" VALUES (22, 'Belgium', 'Bélgica', 'BE', 876, 1);
INSERT INTO "public"."country" VALUES (23, 'Belize', 'Belize', 'BZ', 884, 0);
INSERT INTO "public"."country" VALUES (24, 'Benin', 'Benin', 'BJ', 2291, 0);
INSERT INTO "public"."country" VALUES (25, 'Bermuda', 'Bermudas', 'BM', 906, 0);
INSERT INTO "public"."country" VALUES (26, 'Bhutan', 'Butão', 'BT', 1198, 0);
INSERT INTO "public"."country" VALUES (27, 'Bolivia', 'Bolívia', 'BO', 973, 0);
INSERT INTO "public"."country" VALUES (28, 'Bosnia and Herzegowina', 'Bósnia-herzegovina (Republica da)', 'BA', 981, 0);
INSERT INTO "public"."country" VALUES (29, 'Botswana', 'Botsuana', 'BW', 1015, 0);
INSERT INTO "public"."country" VALUES (30, 'Bouvet Island', 'Ilha Bouvet', 'BV', 3600, 0);
INSERT INTO "public"."country" VALUES (31, 'British Indian Ocean Territory', 'Território Britânico do Oceano Indico', 'IO', 7820, 0);
INSERT INTO "public"."country" VALUES (32, 'Brunei Darussalam', 'Brunei', 'BN', 1082, 0);
INSERT INTO "public"."country" VALUES (33, 'Bulgaria', 'Bulgária, Republica da', 'BG', 1112, 1);
INSERT INTO "public"."country" VALUES (34, 'Burkina Faso', 'Burkina Faso', 'BF', 310, 0);
INSERT INTO "public"."country" VALUES (35, 'Burundi', 'Burundi', 'BI', 1155, 0);
INSERT INTO "public"."country" VALUES (36, 'Cambodia', 'Camboja', 'KH', 1414, 0);
INSERT INTO "public"."country" VALUES (37, 'Cameroon', 'Camarões', 'CM', 1457, 0);
INSERT INTO "public"."country" VALUES (38, 'Canada', 'Canada', 'CA', 1490, 3);
INSERT INTO "public"."country" VALUES (39, 'Cape Verde', 'Cabo Verde, Republica de', 'CV', 1279, 0);
INSERT INTO "public"."country" VALUES (40, 'Cayman Islands', 'Cayman, Ilhas', 'KY', 1376, 0);
INSERT INTO "public"."country" VALUES (41, 'Central African Republic', 'Republica Centro-Africana', 'CF', 6408, 0);
INSERT INTO "public"."country" VALUES (42, 'Chad', 'Chade', 'TD', 7889, 0);
INSERT INTO "public"."country" VALUES (43, 'Chile', 'Chile', 'CL', 1589, 1);
INSERT INTO "public"."country" VALUES (44, 'China', 'China, Republica Popular', 'CN', 1600, 3);
INSERT INTO "public"."country" VALUES (45, 'Christmas Island', 'Christmas, Ilha (Navidad)', 'CX', 5118, 0);
INSERT INTO "public"."country" VALUES (46, 'Cocos (Keeling) Islands', 'Cocos(Keeling, 0), Ilhas', 'CC', 1651, 0);
INSERT INTO "public"."country" VALUES (47, 'Colombia', 'Colômbia', 'CO', 1694, 1);
INSERT INTO "public"."country" VALUES (48, 'Comoros', 'Comores, Ilhas', 'KM', 1732, 0);
INSERT INTO "public"."country" VALUES (49, 'Congo', 'Congo', 'CG', 1775, 0);
INSERT INTO "public"."country" VALUES (50, 'Congo, the Democratic Republic of the', 'Congo, Republica Democrática do', 'CD', 8885, 0);
INSERT INTO "public"."country" VALUES (51, 'Cook Islands', 'Cook, Ilhas', 'CK', 1830, 0);
INSERT INTO "public"."country" VALUES (52, 'Costa Rica', 'Costa Rica', 'CR', 1961, 1);
INSERT INTO "public"."country" VALUES (53, 'Cote d`Ivoire', 'Costa do Marfim', 'CI', 1937, 0);
INSERT INTO "public"."country" VALUES (54, 'Croatia (Hrvatska)', 'Croácia (Republica da)', 'HR', 1953, 0);
INSERT INTO "public"."country" VALUES (55, 'Cuba', 'Cuba', 'CU', 1996, 0);
INSERT INTO "public"."country" VALUES (56, 'Cyprus', 'Chipre', 'CY', 1635, 0);
INSERT INTO "public"."country" VALUES (57, 'Czech Republic', 'Tcheca, Republica', 'CZ', 7919, 1);
INSERT INTO "public"."country" VALUES (58, 'Denmark', 'Dinamarca', 'DK', 2321, 1);
INSERT INTO "public"."country" VALUES (59, 'Djibouti', 'Djibuti', 'DJ', 7838, 0);
INSERT INTO "public"."country" VALUES (60, 'Dominica', 'Dominica, Ilha', 'DM', 2356, 0);
INSERT INTO "public"."country" VALUES (61, 'Dominican Republic', 'Republica Dominicana', 'DO', 6475, 0);
INSERT INTO "public"."country" VALUES (62, 'East Timor', 'Timor Leste', 'TL', 7951, 0);
INSERT INTO "public"."country" VALUES (63, 'Ecuador', 'Equador', 'EC', 2399, 1);
INSERT INTO "public"."country" VALUES (64, 'Egypt', 'Egito', 'EG', 2402, 0);
INSERT INTO "public"."country" VALUES (65, 'El Salvador', 'El Salvador', 'SV', 6874, 0);
INSERT INTO "public"."country" VALUES (66, 'Equatorial Guinea', 'Guine-Equatorial', 'GQ', 3310, 0);
INSERT INTO "public"."country" VALUES (67, 'Eritrea', 'Eritreia', 'ER', 2437, 0);
INSERT INTO "public"."country" VALUES (68, 'Estonia', 'Estônia, Republica da', 'EE', 2518, 1);
INSERT INTO "public"."country" VALUES (69, 'Ethiopia', 'Etiópia', 'ET', 2534, 0);
INSERT INTO "public"."country" VALUES (70, 'Falkland Islands (Malvinas)', 'Falkland (Ilhas Malvinas)', 'FK', 2550, 0);
INSERT INTO "public"."country" VALUES (71, 'Faroe Islands', 'Feroe, Ilhas', 'FO', 2593, 0);
INSERT INTO "public"."country" VALUES (72, 'Fiji', 'Fiji', 'FJ', 8702, 0);
INSERT INTO "public"."country" VALUES (73, 'Finland', 'Finlândia', 'FI', 2712, 1);
INSERT INTO "public"."country" VALUES (74, 'France', 'Franca', 'FR', 2755, 1);
INSERT INTO "public"."country" VALUES (76, 'French Guiana', 'Guiana francesa', 'GF', 3255, 0);
INSERT INTO "public"."country" VALUES (77, 'French Polynesia', 'Polinésia Francesa', 'PF', 5991, 0);
INSERT INTO "public"."country" VALUES (78, 'French Southern Territories', 'Terras Austrais e Antárticas Francesas', 'TF', 3607, 0);
INSERT INTO "public"."country" VALUES (79, 'Gabon', 'Gabão', 'GA', 2810, 0);
INSERT INTO "public"."country" VALUES (80, 'Gambia', 'Gambia', 'GM', 2852, 0);
INSERT INTO "public"."country" VALUES (81, 'Georgia', 'Georgia, Republica da', 'GE', 2917, 0);
INSERT INTO "public"."country" VALUES (82, 'Germany', 'Alemanha', 'DE', 230, 4);
INSERT INTO "public"."country" VALUES (83, 'Ghana', 'Gana', 'GH', 2895, 0);
INSERT INTO "public"."country" VALUES (84, 'Gibraltar', 'Gibraltar', 'GI', 2933, 0);
INSERT INTO "public"."country" VALUES (85, 'Greece', 'Grécia', 'GR', 3018, 1);
INSERT INTO "public"."country" VALUES (86, 'Greenland', 'Groenlândia', 'GL', 3050, 0);
INSERT INTO "public"."country" VALUES (87, 'Grenada', 'Granada', 'GD', 2976, 0);
INSERT INTO "public"."country" VALUES (88, 'Guadeloupe', 'Guadalupe', 'GP', 3093, 0);
INSERT INTO "public"."country" VALUES (89, 'Guam', 'Guam', 'GU', 3131, 0);
INSERT INTO "public"."country" VALUES (90, 'Guatemala', 'Guatemala', 'GT', 3174, 0);
INSERT INTO "public"."country" VALUES (91, 'Guinea', 'Guine', 'GN', 3298, 0);
INSERT INTO "public"."country" VALUES (92, 'Guinea-Bissau', 'Guine-Bissau', 'GW', 3344, 0);
INSERT INTO "public"."country" VALUES (93, 'Guyana', 'Guiana', 'GY', 3379, 0);
INSERT INTO "public"."country" VALUES (94, 'Haiti', 'Haiti', 'HT', 3417, 0);
INSERT INTO "public"."country" VALUES (95, 'Heard and Mc Donald Islands', 'Ilha Heard e Ilhas McDonald', 'HM', 3603, 0);
INSERT INTO "public"."country" VALUES (96, 'Holy See (Vatican City State)', 'Vaticano, Estado da Cidade do', 'VA', 8486, 0);
INSERT INTO "public"."country" VALUES (97, 'Honduras', 'Honduras', 'HN', 3450, 0);
INSERT INTO "public"."country" VALUES (98, 'Hong Kong', 'Hong Kong', 'HK', 3514, 1);
INSERT INTO "public"."country" VALUES (99, 'Hungary', 'Hungria, Republica da', 'HU', 3557, 0);
INSERT INTO "public"."country" VALUES (100, 'Iceland', 'Islândia', 'IS', 3794, 1);
INSERT INTO "public"."country" VALUES (101, 'India', 'Índia', 'IN', 3611, 1);
INSERT INTO "public"."country" VALUES (102, 'Indonesia', 'Indonésia', 'ID', 3654, 0);
INSERT INTO "public"."country" VALUES (103, 'Iran (Islamic Republic of)', 'Ira, Republica Islâmica do', 'IR', 3727, 0);
INSERT INTO "public"."country" VALUES (104, 'Iraq', 'Iraque', 'IQ', 3697, 0);
INSERT INTO "public"."country" VALUES (105, 'Ireland', 'Irlanda', 'IE', 3751, 1);
INSERT INTO "public"."country" VALUES (106, 'Israel', 'Israel', 'IL', 3832, 1);
INSERT INTO "public"."country" VALUES (107, 'Italy', 'Itália', 'IT', 3867, 3);
INSERT INTO "public"."country" VALUES (108, 'Jamaica', 'Jamaica', 'JM', 3913, 0);
INSERT INTO "public"."country" VALUES (109, 'Japan', 'Japão', 'JP', 3999, 4);
INSERT INTO "public"."country" VALUES (110, 'Jordan', 'Jordânia', 'JO', 4030, 0);
INSERT INTO "public"."country" VALUES (111, 'Kazakhstan', 'Cazaquistão, Republica do', 'KZ', 1538, 0);
INSERT INTO "public"."country" VALUES (112, 'Kenya', 'Quênia', 'KE', 6238, 0);
INSERT INTO "public"."country" VALUES (113, 'Kiribati', 'Kiribati', 'KI', 4111, 0);
INSERT INTO "public"."country" VALUES (114, 'Korea, Democratic People`s Republic of', 'Coreia, Republica Popular Democrática da', 'KP', 1872, 0);
INSERT INTO "public"."country" VALUES (115, 'Korea, Republic of', 'Coreia, Republica da', 'KR', 1902, 1);
INSERT INTO "public"."country" VALUES (116, 'Kuwait', 'Coveite', 'KW', 1988, 0);
INSERT INTO "public"."country" VALUES (117, 'Kyrgyzstan', 'Quirguiz, Republica', 'KG', 6254, 0);
INSERT INTO "public"."country" VALUES (118, 'Lao People`s Democratic Republic', 'Laos, Republica Popular Democrática do', 'LA', 4200, 0);
INSERT INTO "public"."country" VALUES (119, 'Latvia', 'Letônia, Republica da', 'LV', 4278, 0);
INSERT INTO "public"."country" VALUES (120, 'Lebanon', 'Líbano', 'LB', 4316, 0);
INSERT INTO "public"."country" VALUES (121, 'Lesotho', 'Lesoto', 'LS', 4260, 0);
INSERT INTO "public"."country" VALUES (122, 'Liberia', 'Libéria', 'LR', 4340, 0);
INSERT INTO "public"."country" VALUES (123, 'Libyan Arab Jamahiriya', 'Líbia', 'LY', 4383, 0);
INSERT INTO "public"."country" VALUES (124, 'Liechtenstein', 'Liechtenstein', 'LI', 4405, 0);
INSERT INTO "public"."country" VALUES (125, 'Lithuania', 'Lituânia, Republica da', 'LT', 4421, 0);
INSERT INTO "public"."country" VALUES (126, 'Luxembourg', 'Luxemburgo', 'LU', 4456, 1);
INSERT INTO "public"."country" VALUES (127, 'Macau', 'Macau', 'MO', 4472, 0);
INSERT INTO "public"."country" VALUES (128, 'Macedonia, The Former Yugoslav Republic of', 'Macedônia, Antiga Republica Iugoslava', 'MK', 4499, 0);
INSERT INTO "public"."country" VALUES (129, 'Madagascar', 'Madagascar', 'MG', 4502, 0);
INSERT INTO "public"."country" VALUES (130, 'Malawi', 'Malavi', 'MW', 4588, 0);
INSERT INTO "public"."country" VALUES (131, 'Malaysia', 'Malásia', 'MY', 4553, 0);
INSERT INTO "public"."country" VALUES (132, 'Maldives', 'Maldivas', 'MV', 4618, 0);
INSERT INTO "public"."country" VALUES (133, 'Mali', 'Mali', 'ML', 4642, 0);
INSERT INTO "public"."country" VALUES (134, 'Malta', 'Malta', 'MT', 4677, 0);
INSERT INTO "public"."country" VALUES (135, 'Marshall Islands', 'Marshall, Ilhas', 'MH', 4766, 0);
INSERT INTO "public"."country" VALUES (136, 'Martinique', 'Martinica', 'MQ', 4774, 0);
INSERT INTO "public"."country" VALUES (137, 'Mauritania', 'Mauritânia', 'MR', 4880, 0);
INSERT INTO "public"."country" VALUES (138, 'Mauritius', 'Mauricio', 'MU', 4855, 0);
INSERT INTO "public"."country" VALUES (139, 'Mayotte', 'Mayotte (Ilhas Francesas)', 'YT', 4885, 0);
INSERT INTO "public"."country" VALUES (140, 'Mexico', 'México', 'MX', 4936, 4);
INSERT INTO "public"."country" VALUES (141, 'Micronesia, Federated States of', 'Micronesia', 'FM', 4995, 0);
INSERT INTO "public"."country" VALUES (142, 'Moldova, Republic of', 'Moldávia, Republica da', 'MD', 4944, 0);
INSERT INTO "public"."country" VALUES (143, 'Monaco', 'Mônaco', 'MC', 4952, 0);
INSERT INTO "public"."country" VALUES (144, 'Mongolia', 'Mongólia', 'MN', 4979, 0);
INSERT INTO "public"."country" VALUES (145, 'Montserrat', 'Montserrat, Ilhas', 'MS', 5010, 0);
INSERT INTO "public"."country" VALUES (146, 'Morocco', 'Marrocos', 'MA', 4740, 0);
INSERT INTO "public"."country" VALUES (147, 'Mozambique', 'Moçambique', 'MZ', 5053, 0);
INSERT INTO "public"."country" VALUES (148, 'Myanmar', 'Mianmar (Birmânia)', 'MM', 930, 0);
INSERT INTO "public"."country" VALUES (149, 'Namibia', 'Namíbia', 'NA', 5070, 0);
INSERT INTO "public"."country" VALUES (150, 'Nauru', 'Nauru', 'NR', 5088, 0);
INSERT INTO "public"."country" VALUES (151, 'Nepal', 'Nepal', 'NP', 5177, 0);
INSERT INTO "public"."country" VALUES (152, 'Netherlands', 'Países Baixos (Holanda)', 'NL', 5738, 1);
INSERT INTO "public"."country" VALUES (153, 'Netherlands Antilles', 'Antilhas Holandesas', 'AN', 477, 0);
INSERT INTO "public"."country" VALUES (154, 'New Caledonia', 'Nova Caledonia', 'NC', 5428, 0);
INSERT INTO "public"."country" VALUES (155, 'New Zealand', 'Nova Zelândia', 'NZ', 5487, 1);
INSERT INTO "public"."country" VALUES (156, 'Nicaragua', 'Nicarágua', 'NI', 5215, 0);
INSERT INTO "public"."country" VALUES (157, 'Niger', 'Níger', 'NE', 5258, 0);
INSERT INTO "public"."country" VALUES (158, 'Nigeria', 'Nigéria', 'NG', 5282, 1);
INSERT INTO "public"."country" VALUES (159, 'Niue', 'Niue, Ilha', 'NU', 5312, 0);
INSERT INTO "public"."country" VALUES (160, 'Norfolk Island', 'Norfolk, Ilha', 'NF', 5355, 0);
INSERT INTO "public"."country" VALUES (161, 'Northern Mariana Islands', 'Marianas do Norte', 'MP', 4723, 0);
INSERT INTO "public"."country" VALUES (162, 'Norway', 'Noruega', 'NO', 5380, 1);
INSERT INTO "public"."country" VALUES (163, 'Oman', 'Oma', 'OM', 5568, 0);
INSERT INTO "public"."country" VALUES (164, 'Pakistan', 'Paquistão', 'PK', 5762, 0);
INSERT INTO "public"."country" VALUES (165, 'Palau', 'Palau', 'PW', 5754, 0);
INSERT INTO "public"."country" VALUES (166, 'Panama', 'Panamá', 'PA', 5800, 0);
INSERT INTO "public"."country" VALUES (167, 'Papua New Guinea', 'Papua Nova Guine', 'PG', 5452, 0);
INSERT INTO "public"."country" VALUES (168, 'Paraguay', 'Paraguai', 'PY', 5860, 1);
INSERT INTO "public"."country" VALUES (169, 'Peru', 'Peru', 'PE', 5894, 1);
INSERT INTO "public"."country" VALUES (170, 'Philippines', 'Filipinas', 'PH', 2674, 0);
INSERT INTO "public"."country" VALUES (171, 'Pitcairn', 'Pitcairn, Ilha', 'PN', 5932, 0);
INSERT INTO "public"."country" VALUES (172, 'Poland', 'Polônia, Republica da', 'PL', 6033, 1);
INSERT INTO "public"."country" VALUES (173, 'Portugal', 'Portugal', 'PT', 6076, 3);
INSERT INTO "public"."country" VALUES (174, 'Puerto Rico', 'Porto Rico', 'PR', 6114, 0);
INSERT INTO "public"."country" VALUES (175, 'Qatar', 'Catar', 'QA', 1546, 0);
INSERT INTO "public"."country" VALUES (176, 'Reunion', 'Reunião, Ilha', 'RE', 6602, 0);
INSERT INTO "public"."country" VALUES (177, 'Romania', 'Romênia', 'RO', 6700, 0);
INSERT INTO "public"."country" VALUES (178, 'Russian Federation', 'Rússia, Federação da', 'RU', 6769, 0);
INSERT INTO "public"."country" VALUES (179, 'Rwanda', 'Ruanda', 'RW', 6750, 0);
INSERT INTO "public"."country" VALUES (180, 'Saint Kitts and Nevis', 'São Cristovão e Neves, Ilhas', 'KN', 6955, 0);
INSERT INTO "public"."country" VALUES (181, 'Saint LUCIA', 'Santa Lucia', 'LC', 7153, 0);
INSERT INTO "public"."country" VALUES (182, 'Saint Vincent and the Grenadines', 'São Vicente e Granadinas', 'VC', 7056, 0);
INSERT INTO "public"."country" VALUES (183, 'Samoa', 'Samoa', 'WS', 6904, 0);
INSERT INTO "public"."country" VALUES (184, 'San Marino', 'San Marino', 'SM', 6971, 0);
INSERT INTO "public"."country" VALUES (185, 'Sao Tome and Principe', 'São Tome e Príncipe, Ilhas', 'ST', 7200, 0);
INSERT INTO "public"."country" VALUES (186, 'Saudi Arabia', 'Arábia Saudita', 'SA', 531, 0);
INSERT INTO "public"."country" VALUES (187, 'Senegal', 'Senegal', 'SN', 7285, 0);
INSERT INTO "public"."country" VALUES (188, 'Seychelles', 'Seychelles', 'SC', 7315, 0);
INSERT INTO "public"."country" VALUES (189, 'Sierra Leone', 'Serra Leoa', 'SL', 7358, 0);
INSERT INTO "public"."country" VALUES (190, 'Singapore', 'Cingapura', 'SG', 7412, 0);
INSERT INTO "public"."country" VALUES (191, 'Slovakia (Slovak Republic)', 'Eslovaca, Republica', 'SK', 2470, 0);
INSERT INTO "public"."country" VALUES (192, 'Slovenia', 'Eslovênia, Republica da', 'SI', 2461, 0);
INSERT INTO "public"."country" VALUES (193, 'Solomon Islands', 'Salomão, Ilhas', 'SB', 6777, 0);
INSERT INTO "public"."country" VALUES (194, 'Somalia', 'Somalia', 'SO', 7480, 0);
INSERT INTO "public"."country" VALUES (195, 'South Africa', 'África do Sul', 'ZA', 7560, 1);
INSERT INTO "public"."country" VALUES (196, 'South Georgia and the South Sandwich Islands', 'Ilhas Geórgia do Sul e Sandwich do Sul', 'GS', 3602, 0);
INSERT INTO "public"."country" VALUES (197, 'Spain', 'Espanha', 'ES', 2453, 3);
INSERT INTO "public"."country" VALUES (198, 'Sri Lanka', 'Sri Lanka', 'LK', 7501, 0);
INSERT INTO "public"."country" VALUES (199, 'St. Helena', 'Santa Helena', 'SH', 7102, 0);
INSERT INTO "public"."country" VALUES (200, 'St. Pierre and Miquelon', 'São Pedro e Miquelon', 'PM', 7005, 0);
INSERT INTO "public"."country" VALUES (201, 'Sudan', 'Sudão', 'SD', 7595, 0);
INSERT INTO "public"."country" VALUES (202, 'Suriname', 'Suriname', 'SR', 7706, 0);
INSERT INTO "public"."country" VALUES (203, 'Svalbard and Jan Mayen Islands', 'Svalbard e Jan Mayen', 'SJ', 3605, 0);
INSERT INTO "public"."country" VALUES (204, 'Swaziland', 'Suazilândia', 'SZ', 7544, 1);
INSERT INTO "public"."country" VALUES (205, 'Sweden', 'Suécia', 'SE', 7641, 1);
INSERT INTO "public"."country" VALUES (206, 'Switzerland', 'Suíça', 'CH', 7676, 1);
INSERT INTO "public"."country" VALUES (207, 'Syrian Arab Republic', 'Síria, Republica Árabe da', 'SY', 7447, 0);
INSERT INTO "public"."country" VALUES (208, 'Taiwan, Province of China', 'Formosa (Taiwan)', 'TW', 1619, 0);
INSERT INTO "public"."country" VALUES (209, 'Tajikistan', 'Tadjiquistao, Republica do', 'TJ', 7722, 0);
INSERT INTO "public"."country" VALUES (210, 'Tanzania, United Republic of', 'Tanzânia, Republica Unida da', 'TZ', 7803, 0);
INSERT INTO "public"."country" VALUES (211, 'Thailand', 'Tailândia', 'TH', 7765, 1);
INSERT INTO "public"."country" VALUES (212, 'Togo', 'Togo', 'TG', 8001, 0);
INSERT INTO "public"."country" VALUES (213, 'Tokelau', 'Toquelau, Ilhas', 'TK', 8052, 0);
INSERT INTO "public"."country" VALUES (214, 'Tonga', 'Tonga', 'TO', 8109, 0);
INSERT INTO "public"."country" VALUES (215, 'Trinidad and Tobago', 'Trinidad e Tobago', 'TT', 8150, 0);
INSERT INTO "public"."country" VALUES (216, 'Tunisia', 'Tunísia', 'TN', 8206, 0);
INSERT INTO "public"."country" VALUES (217, 'Turkey', 'Turquia', 'TR', 8273, 1);
INSERT INTO "public"."country" VALUES (218, 'Turkmenistan', 'Turcomenistão, Republica do', 'TM', 8249, 0);
INSERT INTO "public"."country" VALUES (219, 'Turks and Caicos Islands', 'Turcas e Caicos, Ilhas', 'TC', 8230, 0);
INSERT INTO "public"."country" VALUES (220, 'Tuvalu', 'Tuvalu', 'TV', 8281, 0);
INSERT INTO "public"."country" VALUES (221, 'Uganda', 'Uganda', 'UG', 8338, 0);
INSERT INTO "public"."country" VALUES (222, 'Ukraine', 'Ucrânia', 'UA', 8311, 0);
INSERT INTO "public"."country" VALUES (223, 'United Arab Emirates', 'Emirados Árabes Unidos', 'AE', 2445, 1);
INSERT INTO "public"."country" VALUES (224, 'United Kingdom', 'Reino Unido', 'GB', 6289, 4);
INSERT INTO "public"."country" VALUES (225, 'United States', 'Estados Unidos', 'US', 2496, 4);
INSERT INTO "public"."country" VALUES (226, 'United States Minor Outlying Islands', 'Ilhas Menores Distantes dos Estados Unidos', 'UM', 18664, 0);
INSERT INTO "public"."country" VALUES (227, 'Uruguay', 'Uruguai', 'UY', 8451, 1);
INSERT INTO "public"."country" VALUES (228, 'Uzbekistan', 'Uzbequistão, Republica do', 'UZ', 8478, 0);
INSERT INTO "public"."country" VALUES (229, 'Vanuatu', 'Vanuatu', 'VU', 5517, 0);
INSERT INTO "public"."country" VALUES (230, 'Venezuela', 'Venezuela', 'VE', 8508, 0);
INSERT INTO "public"."country" VALUES (231, 'Viet Nam', 'Vietnã', 'VN', 8583, 0);
INSERT INTO "public"."country" VALUES (232, 'Virgin Islands (British)', 'Virgens, Ilhas (Britânicas)', 'VG', 8630, 0);
INSERT INTO "public"."country" VALUES (233, 'Virgin Islands (U.S.)', 'Virgens, Ilhas (E.U.A.)', 'VI', 8664, 0);
INSERT INTO "public"."country" VALUES (234, 'Wallis and Futuna Islands', 'Wallis e Futuna, Ilhas', 'WF', 8753, 0);
INSERT INTO "public"."country" VALUES (235, 'Western Sahara', 'Saara Ocidental', 'EH', 6858, 0);
INSERT INTO "public"."country" VALUES (236, 'Yemen', 'Iémen', 'YE', 3573, 0);
INSERT INTO "public"."country" VALUES (237, 'Yugoslavia', 'Iugoslávia, República Fed. da', 'YU', 3883, 0);
INSERT INTO "public"."country" VALUES (238, 'Zambia', 'Zâmbia', 'ZM', 8907, 0);
INSERT INTO "public"."country" VALUES (239, 'Zimbabwe', 'Zimbabue', 'ZW', 6653, 0);
INSERT INTO "public"."country" VALUES (240, 'Bailiwick of Guernsey', 'Guernsey, Ilha do Canal (Inclui Alderney e Sark)', 'GG', 1504, 0);
INSERT INTO "public"."country" VALUES (241, 'Bailiwick of Jersey', 'Jersey, Ilha do Canal', 'JE', 1508, 0);
INSERT INTO "public"."country" VALUES (242, 'Canarias', 'Canarias, Ilhas', NULL, 1511, 0);
INSERT INTO "public"."country" VALUES (243, 'Isle of Man', 'Man, Ilha de', 'IM', 3595, 0);
INSERT INTO "public"."country" VALUES (244, 'Johnston Atoll', 'Johnston, Ilhas', NULL, 3964, 0);
INSERT INTO "public"."country" VALUES (245, 'Madeira', 'Madeira, Ilha da', NULL, 4525, 0);
INSERT INTO "public"."country" VALUES (246, 'Crna Gora (Montenegro)', 'Montenegro', 'ME', 4985, 0);
INSERT INTO "public"."country" VALUES (247, 'SÉRVIA', 'Republika Srbija', 'RS', 7370, 0);
INSERT INTO "public"."country" VALUES (248, 'Republic of South Sudan', 'Sudao do Sul', 'SS', 7600, 0);
INSERT INTO "public"."country" VALUES (249, 'Zona del Canal de Panamá', 'Zona do Canal do Panamá', NULL, 8958, 0);
INSERT INTO "public"."country" VALUES (250, 'Wake', 'Wake, Ilha', NULL, 8737, 0);
INSERT INTO "public"."country" VALUES (251, 'Labuan', 'Lebuan, Ilhas', NULL, 4235, 0);
INSERT INTO "public"."country" VALUES (252, 'Dawlat Filasṭīn', 'Palestina', 'PS', 5780, 0);
INSERT INTO "public"."country" VALUES (253, 'Åland Islands', 'Ilhas de Aland', 'AX', 3597, 0);
INSERT INTO "public"."country" VALUES (254, 'Saint Barthélemy', 'Coletividade de São Bartolomeu', 'BL', 3598, 0);
INSERT INTO "public"."country" VALUES (255, 'Curaçao', 'Curaçao', 'CW', 3601, 0);
INSERT INTO "public"."country" VALUES (256, 'Saint Martin', 'Ilha de São Martinho (França)', 'MF', 3604, 0);
INSERT INTO "public"."country" VALUES (257, 'Sint Maarten (Dutch part)', 'São Martinho (Países Baixos)', 'SX', 3606, 0);
COMMIT;

-- ----------------------------
-- Table structure for entity
-- ----------------------------
DROP TABLE IF EXISTS "public"."entity";
CREATE TABLE "public"."entity" (
  "id" int4 NOT NULL DEFAULT nextval('entity_id_seq'::regclass),
  "name" text COLLATE "pg_catalog"."default" NOT NULL,
  "code" text COLLATE "pg_catalog"."default",
  "entitytype" "public"."entitytype" NOT NULL,
  "createdat" timestamptz(6) NOT NULL DEFAULT now(),
  "countryid" int4,
  "addressid" int4,
  "updatedat" timestamptz(6) NOT NULL DEFAULT now(),
  "deleted" bool NOT NULL DEFAULT false,
  "version" int4 DEFAULT 1,
  "revisedat" date NOT NULL DEFAULT now(),
  "bornat" date
)
;
ALTER TABLE "public"."entity" OWNER TO "yaiebczsrnzufv";

-- ----------------------------
-- Records of entity
-- ----------------------------
BEGIN;
INSERT INTO "public"."entity" VALUES (1, 'Pagseguro Internet S.A.', '08561701000101', 'legal', '2018-03-27 17:04:25.287913+01', 1, 1, '2018-03-27 17:04:25.287913+01', 'f', 1, '2018-03-27', '2006-12-20');
INSERT INTO "public"."entity" VALUES (2, 'Universo Online S/A', '01109184000195', 'legal', '2018-03-27 17:04:41.720689+01', 1, 2, '2018-03-27 17:04:41.720689+01', 'f', 1, '2018-03-27', '1996-03-13');
INSERT INTO "public"."entity" VALUES (3, 'Marcos Augusto', NULL, 'individual', '2018-03-27 17:05:05.848175+01', NULL, 3, '2018-03-27 17:05:05.848175+01', 'f', 1, '2018-03-27', NULL);
COMMIT;

-- ----------------------------
-- Table structure for entityaudit
-- ----------------------------
DROP TABLE IF EXISTS "public"."entityaudit";
CREATE TABLE "public"."entityaudit" (
  "id" int4 NOT NULL DEFAULT nextval('entityaudit_id_seq'::regclass),
  "stamp" timestamp(6),
  "mainrowid" int4 NOT NULL,
  "name" text COLLATE "pg_catalog"."default" NOT NULL,
  "code" text COLLATE "pg_catalog"."default",
  "entitytype" "public"."entitytype" NOT NULL,
  "createdat" timestamptz(6) NOT NULL,
  "countryid" int4,
  "addressid" int4,
  "updatedat" timestamptz(6) NOT NULL,
  "deleted" bool NOT NULL DEFAULT false,
  "version" int4 NOT NULL DEFAULT 1,
  "revisedat" date NOT NULL DEFAULT now(),
  "bornat" date
)
;
ALTER TABLE "public"."entityaudit" OWNER TO "yaiebczsrnzufv";

-- ----------------------------
-- Table structure for goose_db_version
-- ----------------------------
DROP TABLE IF EXISTS "public"."goose_db_version";
CREATE TABLE "public"."goose_db_version" (
  "id" int4 NOT NULL DEFAULT nextval('goose_db_version_id_seq'::regclass),
  "version_id" int8 NOT NULL,
  "is_applied" bool NOT NULL,
  "tstamp" timestamp(6) DEFAULT now()
)
;
ALTER TABLE "public"."goose_db_version" OWNER TO "yaiebczsrnzufv";

-- ----------------------------
-- Records of goose_db_version
-- ----------------------------
BEGIN;
INSERT INTO "public"."goose_db_version" VALUES (1, 0, 't', '2018-01-11 17:27:35.493278');
INSERT INTO "public"."goose_db_version" VALUES (2, 1, 't', '2018-01-11 17:27:35.547763');
INSERT INTO "public"."goose_db_version" VALUES (3, 2, 't', '2018-01-11 17:27:35.584994');
INSERT INTO "public"."goose_db_version" VALUES (4, 3, 't', '2018-01-11 17:27:35.613274');
INSERT INTO "public"."goose_db_version" VALUES (5, 4, 't', '2018-01-11 17:27:35.620705');
INSERT INTO "public"."goose_db_version" VALUES (6, 5, 't', '2018-01-11 17:27:35.65889');
INSERT INTO "public"."goose_db_version" VALUES (7, 6, 't', '2018-01-11 17:27:35.688498');
INSERT INTO "public"."goose_db_version" VALUES (8, 7, 't', '2018-01-12 15:14:57.658618');
INSERT INTO "public"."goose_db_version" VALUES (9, 8, 't', '2018-01-12 15:17:04.684285');
INSERT INTO "public"."goose_db_version" VALUES (10, 9, 't', '2018-01-12 15:18:55.589864');
INSERT INTO "public"."goose_db_version" VALUES (11, 10, 't', '2018-01-12 15:28:36.199249');
INSERT INTO "public"."goose_db_version" VALUES (12, 10, 'f', '2018-01-12 15:28:53.227596');
INSERT INTO "public"."goose_db_version" VALUES (13, 9, 'f', '2018-01-12 15:28:58.077775');
INSERT INTO "public"."goose_db_version" VALUES (14, 9, 't', '2018-01-12 15:29:02.385299');
INSERT INTO "public"."goose_db_version" VALUES (15, 10, 't', '2018-01-12 15:29:02.387669');
INSERT INTO "public"."goose_db_version" VALUES (16, 11, 't', '2018-01-12 16:03:21.083623');
INSERT INTO "public"."goose_db_version" VALUES (17, 11, 'f', '2018-01-12 16:06:09.769408');
INSERT INTO "public"."goose_db_version" VALUES (18, 11, 't', '2018-01-12 16:06:16.508612');
INSERT INTO "public"."goose_db_version" VALUES (19, 12, 't', '2018-01-12 16:53:42.301868');
INSERT INTO "public"."goose_db_version" VALUES (20, 12, 'f', '2018-01-12 16:53:59.222651');
INSERT INTO "public"."goose_db_version" VALUES (21, 11, 'f', '2018-01-12 16:54:07.784743');
INSERT INTO "public"."goose_db_version" VALUES (22, 11, 't', '2018-01-12 16:54:13.161921');
INSERT INTO "public"."goose_db_version" VALUES (23, 12, 't', '2018-01-12 16:54:13.165535');
INSERT INTO "public"."goose_db_version" VALUES (24, 12, 'f', '2018-01-12 16:54:32.504919');
INSERT INTO "public"."goose_db_version" VALUES (25, 12, 't', '2018-01-12 16:55:25.466188');
INSERT INTO "public"."goose_db_version" VALUES (26, 12, 'f', '2018-01-12 16:55:46.144721');
INSERT INTO "public"."goose_db_version" VALUES (27, 12, 't', '2018-01-12 16:56:22.813346');
INSERT INTO "public"."goose_db_version" VALUES (28, 12, 'f', '2018-01-13 15:12:52.573191');
INSERT INTO "public"."goose_db_version" VALUES (29, 11, 'f', '2018-01-13 15:12:53.6048');
INSERT INTO "public"."goose_db_version" VALUES (30, 10, 'f', '2018-01-13 15:12:54.452435');
INSERT INTO "public"."goose_db_version" VALUES (31, 9, 'f', '2018-01-13 15:12:55.306888');
INSERT INTO "public"."goose_db_version" VALUES (32, 8, 'f', '2018-01-13 15:12:56.263403');
INSERT INTO "public"."goose_db_version" VALUES (33, 7, 'f', '2018-01-13 15:12:57.204191');
INSERT INTO "public"."goose_db_version" VALUES (34, 7, 't', '2018-01-13 15:13:09.422638');
INSERT INTO "public"."goose_db_version" VALUES (35, 8, 't', '2018-01-13 15:13:09.540684');
INSERT INTO "public"."goose_db_version" VALUES (36, 9, 't', '2018-01-13 15:13:09.549557');
INSERT INTO "public"."goose_db_version" VALUES (37, 10, 't', '2018-01-13 15:13:09.551168');
INSERT INTO "public"."goose_db_version" VALUES (38, 10, 'f', '2018-01-13 15:13:38.055346');
INSERT INTO "public"."goose_db_version" VALUES (39, 9, 'f', '2018-01-13 15:13:38.818186');
INSERT INTO "public"."goose_db_version" VALUES (40, 8, 'f', '2018-01-13 15:13:39.470525');
INSERT INTO "public"."goose_db_version" VALUES (41, 7, 'f', '2018-01-13 15:13:41.797126');
INSERT INTO "public"."goose_db_version" VALUES (42, 7, 't', '2018-01-13 15:13:44.960423');
INSERT INTO "public"."goose_db_version" VALUES (43, 8, 't', '2018-01-13 15:13:44.962823');
INSERT INTO "public"."goose_db_version" VALUES (44, 9, 't', '2018-01-13 15:13:44.968906');
INSERT INTO "public"."goose_db_version" VALUES (45, 10, 't', '2018-01-13 15:13:44.970735');
INSERT INTO "public"."goose_db_version" VALUES (46, 10, 'f', '2018-01-13 15:14:58.401864');
INSERT INTO "public"."goose_db_version" VALUES (47, 9, 'f', '2018-01-13 15:14:59.200185');
INSERT INTO "public"."goose_db_version" VALUES (48, 8, 'f', '2018-01-13 15:14:59.914226');
INSERT INTO "public"."goose_db_version" VALUES (49, 7, 'f', '2018-01-13 15:15:00.595273');
INSERT INTO "public"."goose_db_version" VALUES (50, 6, 'f', '2018-01-13 15:15:01.35298');
INSERT INTO "public"."goose_db_version" VALUES (51, 5, 'f', '2018-01-13 15:15:02.095496');
INSERT INTO "public"."goose_db_version" VALUES (52, 4, 'f', '2018-01-13 15:15:02.826823');
INSERT INTO "public"."goose_db_version" VALUES (53, 3, 'f', '2018-01-13 15:15:03.577199');
INSERT INTO "public"."goose_db_version" VALUES (54, 2, 'f', '2018-01-13 15:15:04.323191');
INSERT INTO "public"."goose_db_version" VALUES (55, 1, 'f', '2018-01-13 15:15:05.032025');
INSERT INTO "public"."goose_db_version" VALUES (56, 1, 't', '2018-01-13 15:15:09.483247');
INSERT INTO "public"."goose_db_version" VALUES (57, 2, 't', '2018-01-13 15:15:09.51328');
INSERT INTO "public"."goose_db_version" VALUES (58, 3, 't', '2018-01-13 15:15:09.514879');
INSERT INTO "public"."goose_db_version" VALUES (59, 4, 't', '2018-01-13 15:15:09.516249');
INSERT INTO "public"."goose_db_version" VALUES (60, 5, 't', '2018-01-13 15:15:09.526493');
INSERT INTO "public"."goose_db_version" VALUES (61, 6, 't', '2018-01-13 15:15:09.555093');
INSERT INTO "public"."goose_db_version" VALUES (62, 7, 't', '2018-01-13 15:15:09.559942');
INSERT INTO "public"."goose_db_version" VALUES (63, 8, 't', '2018-01-13 15:15:09.561428');
INSERT INTO "public"."goose_db_version" VALUES (64, 9, 't', '2018-01-13 15:15:09.566594');
INSERT INTO "public"."goose_db_version" VALUES (65, 10, 't', '2018-01-13 15:15:09.568005');
INSERT INTO "public"."goose_db_version" VALUES (66, 11, 't', '2018-01-13 15:15:09.57061');
INSERT INTO "public"."goose_db_version" VALUES (67, 12, 't', '2018-01-13 15:15:09.572443');
INSERT INTO "public"."goose_db_version" VALUES (68, 13, 't', '2018-01-13 15:30:47.383741');
INSERT INTO "public"."goose_db_version" VALUES (69, 13, 'f', '2018-01-13 15:32:41.155043');
INSERT INTO "public"."goose_db_version" VALUES (70, 13, 't', '2018-01-14 01:24:37.568635');
INSERT INTO "public"."goose_db_version" VALUES (71, 14, 't', '2018-01-14 23:03:06.842434');
INSERT INTO "public"."goose_db_version" VALUES (72, 14, 'f', '2018-01-14 23:05:47.766454');
INSERT INTO "public"."goose_db_version" VALUES (73, 13, 'f', '2018-01-14 23:06:07.487632');
INSERT INTO "public"."goose_db_version" VALUES (74, 13, 't', '2018-01-14 23:06:23.058144');
INSERT INTO "public"."goose_db_version" VALUES (75, 14, 't', '2018-01-14 23:08:47.985987');
INSERT INTO "public"."goose_db_version" VALUES (76, 15, 't', '2018-01-14 23:25:13.183305');
INSERT INTO "public"."goose_db_version" VALUES (77, 15, 'f', '2018-01-14 23:25:16.242981');
INSERT INTO "public"."goose_db_version" VALUES (78, 15, 't', '2018-01-14 23:25:26.042543');
INSERT INTO "public"."goose_db_version" VALUES (79, 15, 'f', '2018-01-14 23:25:30.137674');
INSERT INTO "public"."goose_db_version" VALUES (80, 15, 't', '2018-01-14 23:27:17.615771');
INSERT INTO "public"."goose_db_version" VALUES (81, 15, 'f', '2018-01-14 23:28:03.150904');
INSERT INTO "public"."goose_db_version" VALUES (82, 15, 't', '2018-01-14 23:30:32.91334');
INSERT INTO "public"."goose_db_version" VALUES (83, 15, 'f', '2018-01-14 23:30:35.343246');
INSERT INTO "public"."goose_db_version" VALUES (84, 15, 't', '2018-01-14 23:39:25.046717');
INSERT INTO "public"."goose_db_version" VALUES (85, 15, 'f', '2018-01-14 23:39:29.411071');
INSERT INTO "public"."goose_db_version" VALUES (86, 15, 't', '2018-01-14 23:46:25.912708');
INSERT INTO "public"."goose_db_version" VALUES (87, 15, 'f', '2018-01-14 23:47:26.648882');
INSERT INTO "public"."goose_db_version" VALUES (88, 15, 't', '2018-01-14 23:51:10.972044');
INSERT INTO "public"."goose_db_version" VALUES (89, 15, 'f', '2018-01-14 23:51:54.734436');
INSERT INTO "public"."goose_db_version" VALUES (90, 15, 't', '2018-01-14 23:51:56.063331');
INSERT INTO "public"."goose_db_version" VALUES (91, 16, 't', '2018-01-15 17:57:13.776088');
INSERT INTO "public"."goose_db_version" VALUES (92, 16, 'f', '2018-01-15 17:57:38.864222');
INSERT INTO "public"."goose_db_version" VALUES (93, 16, 't', '2018-01-15 17:57:51.880586');
INSERT INTO "public"."goose_db_version" VALUES (94, 16, 'f', '2018-01-15 17:57:58.810608');
INSERT INTO "public"."goose_db_version" VALUES (95, 16, 't', '2018-01-15 17:58:00.49793');
INSERT INTO "public"."goose_db_version" VALUES (96, 17, 't', '2018-01-17 17:17:39.009232');
INSERT INTO "public"."goose_db_version" VALUES (97, 18, 't', '2018-01-17 17:17:39.036818');
INSERT INTO "public"."goose_db_version" VALUES (98, 19, 't', '2018-01-17 18:46:00.263363');
INSERT INTO "public"."goose_db_version" VALUES (99, 19, 'f', '2018-01-17 18:46:08.115396');
INSERT INTO "public"."goose_db_version" VALUES (100, 19, 't', '2018-01-17 18:46:32.000308');
INSERT INTO "public"."goose_db_version" VALUES (101, 19, 'f', '2018-01-17 18:46:38.637708');
INSERT INTO "public"."goose_db_version" VALUES (102, 19, 't', '2018-01-17 18:46:44.419812');
INSERT INTO "public"."goose_db_version" VALUES (103, 19, 'f', '2018-01-19 14:38:18.884452');
INSERT INTO "public"."goose_db_version" VALUES (104, 19, 't', '2018-01-19 14:38:21.883913');
INSERT INTO "public"."goose_db_version" VALUES (105, 19, 'f', '2018-01-19 14:38:58.514775');
INSERT INTO "public"."goose_db_version" VALUES (106, 19, 't', '2018-01-19 14:38:59.797664');
INSERT INTO "public"."goose_db_version" VALUES (107, 19, 'f', '2018-01-19 14:40:39.000728');
INSERT INTO "public"."goose_db_version" VALUES (108, 19, 't', '2018-01-19 14:40:39.912584');
INSERT INTO "public"."goose_db_version" VALUES (109, 20, 't', '2018-01-19 23:05:09.55313');
INSERT INTO "public"."goose_db_version" VALUES (110, 21, 't', '2018-01-19 23:16:11.617635');
INSERT INTO "public"."goose_db_version" VALUES (111, 21, 'f', '2018-01-19 23:19:07.632745');
INSERT INTO "public"."goose_db_version" VALUES (112, 21, 't', '2018-01-19 23:25:17.556051');
INSERT INTO "public"."goose_db_version" VALUES (113, 21, 'f', '2018-01-19 23:29:00.920694');
INSERT INTO "public"."goose_db_version" VALUES (114, 21, 't', '2018-01-19 23:29:03.643662');
INSERT INTO "public"."goose_db_version" VALUES (115, 21, 'f', '2018-01-19 23:33:23.409671');
INSERT INTO "public"."goose_db_version" VALUES (116, 21, 't', '2018-01-19 23:33:25.040909');
INSERT INTO "public"."goose_db_version" VALUES (117, 21, 'f', '2018-01-19 23:40:46.962717');
INSERT INTO "public"."goose_db_version" VALUES (118, 20, 'f', '2018-01-19 23:40:48.154432');
INSERT INTO "public"."goose_db_version" VALUES (119, 20, 't', '2018-01-22 15:05:21.087197');
INSERT INTO "public"."goose_db_version" VALUES (120, 20, 'f', '2018-01-22 15:59:24.785351');
INSERT INTO "public"."goose_db_version" VALUES (121, 20, 't', '2018-01-22 15:59:26.548654');
INSERT INTO "public"."goose_db_version" VALUES (122, 20, 'f', '2018-01-22 16:00:41.198439');
INSERT INTO "public"."goose_db_version" VALUES (123, 20, 't', '2018-01-22 16:00:42.221832');
INSERT INTO "public"."goose_db_version" VALUES (124, 20, 'f', '2018-01-22 16:17:50.191378');
INSERT INTO "public"."goose_db_version" VALUES (125, 20, 't', '2018-01-22 16:17:52.654055');
INSERT INTO "public"."goose_db_version" VALUES (126, 20, 'f', '2018-01-22 17:50:49.143588');
INSERT INTO "public"."goose_db_version" VALUES (127, 20, 't', '2018-01-22 17:50:52.981061');
INSERT INTO "public"."goose_db_version" VALUES (128, 21, 't', '2018-01-22 17:52:13.731658');
INSERT INTO "public"."goose_db_version" VALUES (129, 22, 't', '2018-01-22 18:45:44.642176');
INSERT INTO "public"."goose_db_version" VALUES (130, 23, 't', '2018-01-24 14:51:22.29645');
INSERT INTO "public"."goose_db_version" VALUES (131, 23, 'f', '2018-01-24 14:51:26.912854');
INSERT INTO "public"."goose_db_version" VALUES (132, 23, 't', '2018-01-24 15:06:49.78112');
INSERT INTO "public"."goose_db_version" VALUES (133, 23, 'f', '2018-01-24 15:07:32.978694');
INSERT INTO "public"."goose_db_version" VALUES (134, 23, 't', '2018-01-24 15:07:38.17622');
INSERT INTO "public"."goose_db_version" VALUES (135, 24, 't', '2018-01-24 15:18:41.609355');
INSERT INTO "public"."goose_db_version" VALUES (136, 24, 'f', '2018-01-24 15:18:51.294985');
INSERT INTO "public"."goose_db_version" VALUES (137, 23, 'f', '2018-01-24 15:18:52.397223');
INSERT INTO "public"."goose_db_version" VALUES (138, 23, 't', '2018-01-24 15:19:32.278966');
INSERT INTO "public"."goose_db_version" VALUES (139, 24, 't', '2018-01-24 15:19:32.287398');
INSERT INTO "public"."goose_db_version" VALUES (140, 24, 'f', '2018-01-24 15:21:41.039386');
INSERT INTO "public"."goose_db_version" VALUES (141, 23, 'f', '2018-01-24 15:21:43.444649');
INSERT INTO "public"."goose_db_version" VALUES (142, 23, 't', '2018-01-24 15:21:52.895073');
INSERT INTO "public"."goose_db_version" VALUES (143, 24, 't', '2018-01-24 15:21:52.898865');
INSERT INTO "public"."goose_db_version" VALUES (144, 24, 'f', '2018-01-24 15:23:54.147126');
INSERT INTO "public"."goose_db_version" VALUES (145, 23, 'f', '2018-01-24 15:23:55.969615');
INSERT INTO "public"."goose_db_version" VALUES (146, 23, 't', '2018-01-24 15:24:15.737572');
INSERT INTO "public"."goose_db_version" VALUES (147, 24, 't', '2018-01-24 15:24:15.747633');
INSERT INTO "public"."goose_db_version" VALUES (148, 24, 'f', '2018-01-24 15:25:24.233082');
INSERT INTO "public"."goose_db_version" VALUES (149, 23, 'f', '2018-01-24 15:25:31.944829');
INSERT INTO "public"."goose_db_version" VALUES (150, 23, 't', '2018-01-24 15:26:30.175533');
INSERT INTO "public"."goose_db_version" VALUES (151, 23, 'f', '2018-01-24 15:28:49.869436');
INSERT INTO "public"."goose_db_version" VALUES (152, 23, 't', '2018-01-24 15:29:24.047429');
INSERT INTO "public"."goose_db_version" VALUES (153, 23, 'f', '2018-01-24 15:32:22.171096');
INSERT INTO "public"."goose_db_version" VALUES (154, 23, 't', '2018-01-24 15:32:31.23888');
INSERT INTO "public"."goose_db_version" VALUES (155, 24, 't', '2018-01-24 15:33:38.065034');
INSERT INTO "public"."goose_db_version" VALUES (156, 24, 'f', '2018-01-24 15:43:53.629646');
INSERT INTO "public"."goose_db_version" VALUES (157, 24, 't', '2018-01-24 15:44:11.101946');
INSERT INTO "public"."goose_db_version" VALUES (158, 24, 'f', '2018-01-24 15:44:42.84022');
INSERT INTO "public"."goose_db_version" VALUES (159, 23, 'f', '2018-01-24 15:44:44.39059');
INSERT INTO "public"."goose_db_version" VALUES (160, 23, 't', '2018-01-24 15:46:44.397007');
INSERT INTO "public"."goose_db_version" VALUES (161, 24, 't', '2018-01-24 15:46:55.928099');
INSERT INTO "public"."goose_db_version" VALUES (162, 24, 'f', '2018-01-24 15:48:18.933497');
INSERT INTO "public"."goose_db_version" VALUES (163, 23, 'f', '2018-01-24 15:48:19.75284');
INSERT INTO "public"."goose_db_version" VALUES (164, 23, 't', '2018-01-24 15:51:47.216219');
INSERT INTO "public"."goose_db_version" VALUES (165, 24, 't', '2018-01-24 15:51:47.220226');
INSERT INTO "public"."goose_db_version" VALUES (166, 24, 'f', '2018-01-24 15:53:26.543158');
INSERT INTO "public"."goose_db_version" VALUES (167, 23, 'f', '2018-01-24 15:53:27.263836');
INSERT INTO "public"."goose_db_version" VALUES (168, 23, 't', '2018-01-24 15:53:28.647901');
INSERT INTO "public"."goose_db_version" VALUES (169, 24, 't', '2018-01-24 15:53:28.651342');
INSERT INTO "public"."goose_db_version" VALUES (170, 24, 'f', '2018-01-24 15:54:16.483238');
INSERT INTO "public"."goose_db_version" VALUES (171, 23, 'f', '2018-01-24 15:54:17.068184');
INSERT INTO "public"."goose_db_version" VALUES (172, 23, 't', '2018-01-24 15:54:18.655378');
INSERT INTO "public"."goose_db_version" VALUES (173, 24, 't', '2018-01-24 15:54:18.659428');
INSERT INTO "public"."goose_db_version" VALUES (174, 24, 'f', '2018-01-24 16:04:31.986539');
INSERT INTO "public"."goose_db_version" VALUES (175, 23, 'f', '2018-01-24 16:04:32.805599');
INSERT INTO "public"."goose_db_version" VALUES (176, 23, 't', '2018-01-24 16:04:36.840398');
INSERT INTO "public"."goose_db_version" VALUES (177, 24, 't', '2018-01-24 16:04:36.84865');
INSERT INTO "public"."goose_db_version" VALUES (178, 24, 'f', '2018-01-24 16:05:35.463705');
INSERT INTO "public"."goose_db_version" VALUES (179, 23, 'f', '2018-01-24 16:05:36.168599');
INSERT INTO "public"."goose_db_version" VALUES (180, 23, 't', '2018-01-24 16:05:51.710377');
INSERT INTO "public"."goose_db_version" VALUES (181, 24, 't', '2018-01-24 16:05:51.713971');
INSERT INTO "public"."goose_db_version" VALUES (182, 24, 'f', '2018-01-24 16:06:10.373922');
INSERT INTO "public"."goose_db_version" VALUES (183, 23, 'f', '2018-01-24 16:06:21.095977');
INSERT INTO "public"."goose_db_version" VALUES (184, 23, 't', '2018-01-24 16:07:22.641588');
INSERT INTO "public"."goose_db_version" VALUES (185, 24, 't', '2018-01-24 16:07:22.692135');
INSERT INTO "public"."goose_db_version" VALUES (186, 24, 'f', '2018-01-24 16:07:47.359519');
INSERT INTO "public"."goose_db_version" VALUES (187, 23, 'f', '2018-01-24 16:07:48.018647');
INSERT INTO "public"."goose_db_version" VALUES (188, 23, 't', '2018-01-24 16:08:07.275221');
INSERT INTO "public"."goose_db_version" VALUES (189, 24, 't', '2018-01-24 16:08:07.283595');
INSERT INTO "public"."goose_db_version" VALUES (190, 24, 'f', '2018-01-24 16:08:33.208132');
INSERT INTO "public"."goose_db_version" VALUES (191, 23, 'f', '2018-01-24 16:08:33.93777');
INSERT INTO "public"."goose_db_version" VALUES (192, 23, 't', '2018-01-24 16:08:35.512599');
INSERT INTO "public"."goose_db_version" VALUES (193, 24, 't', '2018-01-24 16:08:35.52042');
INSERT INTO "public"."goose_db_version" VALUES (194, 24, 'f', '2018-01-24 16:11:18.104981');
INSERT INTO "public"."goose_db_version" VALUES (195, 23, 'f', '2018-01-24 16:11:18.978074');
INSERT INTO "public"."goose_db_version" VALUES (196, 23, 't', '2018-01-24 16:11:20.474201');
INSERT INTO "public"."goose_db_version" VALUES (197, 24, 't', '2018-01-24 16:11:30.813502');
INSERT INTO "public"."goose_db_version" VALUES (198, 24, 'f', '2018-01-24 16:12:38.608514');
INSERT INTO "public"."goose_db_version" VALUES (199, 23, 'f', '2018-01-24 16:12:39.629892');
INSERT INTO "public"."goose_db_version" VALUES (200, 23, 't', '2018-01-24 16:12:41.250346');
INSERT INTO "public"."goose_db_version" VALUES (201, 24, 't', '2018-01-24 16:12:41.258216');
INSERT INTO "public"."goose_db_version" VALUES (202, 24, 'f', '2018-01-24 16:16:07.444161');
INSERT INTO "public"."goose_db_version" VALUES (203, 23, 'f', '2018-01-24 16:16:08.163236');
INSERT INTO "public"."goose_db_version" VALUES (204, 23, 't', '2018-01-24 16:16:09.468406');
INSERT INTO "public"."goose_db_version" VALUES (205, 24, 't', '2018-01-24 16:16:09.47238');
INSERT INTO "public"."goose_db_version" VALUES (206, 24, 'f', '2018-01-24 16:24:04.113914');
INSERT INTO "public"."goose_db_version" VALUES (207, 23, 'f', '2018-01-24 16:24:04.810619');
INSERT INTO "public"."goose_db_version" VALUES (208, 23, 't', '2018-01-24 16:24:06.149364');
INSERT INTO "public"."goose_db_version" VALUES (209, 24, 't', '2018-01-24 16:24:06.15773');
INSERT INTO "public"."goose_db_version" VALUES (210, 24, 'f', '2018-01-24 16:28:25.176062');
INSERT INTO "public"."goose_db_version" VALUES (211, 23, 'f', '2018-01-24 16:28:25.971797');
INSERT INTO "public"."goose_db_version" VALUES (212, 23, 't', '2018-01-24 16:28:27.265508');
INSERT INTO "public"."goose_db_version" VALUES (213, 24, 't', '2018-01-24 16:28:27.27365');
INSERT INTO "public"."goose_db_version" VALUES (214, 24, 'f', '2018-01-24 16:32:29.066158');
INSERT INTO "public"."goose_db_version" VALUES (215, 23, 'f', '2018-01-24 16:32:29.740279');
INSERT INTO "public"."goose_db_version" VALUES (216, 23, 't', '2018-01-24 16:32:31.101622');
INSERT INTO "public"."goose_db_version" VALUES (217, 24, 't', '2018-01-24 16:32:31.105581');
INSERT INTO "public"."goose_db_version" VALUES (218, 24, 'f', '2018-01-24 16:34:19.049241');
INSERT INTO "public"."goose_db_version" VALUES (219, 23, 'f', '2018-01-24 16:34:19.890615');
INSERT INTO "public"."goose_db_version" VALUES (220, 23, 't', '2018-01-24 16:34:21.185407');
INSERT INTO "public"."goose_db_version" VALUES (221, 24, 't', '2018-01-24 16:34:21.189185');
INSERT INTO "public"."goose_db_version" VALUES (222, 24, 'f', '2018-01-24 16:35:22.455393');
INSERT INTO "public"."goose_db_version" VALUES (223, 23, 'f', '2018-01-24 16:35:23.47822');
INSERT INTO "public"."goose_db_version" VALUES (224, 23, 't', '2018-01-24 16:35:24.626543');
INSERT INTO "public"."goose_db_version" VALUES (225, 24, 't', '2018-01-24 16:35:24.630409');
INSERT INTO "public"."goose_db_version" VALUES (226, 25, 't', '2018-01-24 16:39:20.608402');
INSERT INTO "public"."goose_db_version" VALUES (227, 26, 't', '2018-01-24 16:50:05.046308');
INSERT INTO "public"."goose_db_version" VALUES (228, 27, 't', '2018-01-24 17:10:14.104692');
INSERT INTO "public"."goose_db_version" VALUES (229, 28, 't', '2018-01-24 17:17:50.319129');
INSERT INTO "public"."goose_db_version" VALUES (230, 29, 't', '2018-01-24 17:17:50.382673');
INSERT INTO "public"."goose_db_version" VALUES (231, 30, 't', '2018-01-24 21:47:48.523223');
INSERT INTO "public"."goose_db_version" VALUES (232, 30, 'f', '2018-01-24 21:47:59.188469');
INSERT INTO "public"."goose_db_version" VALUES (233, 29, 'f', '2018-01-24 21:49:23.338888');
INSERT INTO "public"."goose_db_version" VALUES (234, 28, 'f', '2018-01-24 21:49:24.750322');
INSERT INTO "public"."goose_db_version" VALUES (235, 27, 'f', '2018-01-24 21:49:26.44955');
INSERT INTO "public"."goose_db_version" VALUES (236, 26, 'f', '2018-01-24 21:49:30.307885');
INSERT INTO "public"."goose_db_version" VALUES (237, 25, 'f', '2018-01-24 21:49:42.997804');
INSERT INTO "public"."goose_db_version" VALUES (238, 24, 'f', '2018-01-24 21:49:43.729282');
INSERT INTO "public"."goose_db_version" VALUES (239, 23, 'f', '2018-01-24 21:49:44.361874');
INSERT INTO "public"."goose_db_version" VALUES (240, 23, 't', '2018-01-24 22:12:25.973756');
INSERT INTO "public"."goose_db_version" VALUES (241, 24, 't', '2018-01-24 22:12:26.013109');
INSERT INTO "public"."goose_db_version" VALUES (242, 25, 't', '2018-01-24 22:12:26.026905');
INSERT INTO "public"."goose_db_version" VALUES (243, 26, 't', '2018-01-24 22:12:26.035881');
INSERT INTO "public"."goose_db_version" VALUES (244, 27, 't', '2018-01-24 22:12:26.046794');
INSERT INTO "public"."goose_db_version" VALUES (245, 28, 't', '2018-01-24 22:12:26.082118');
INSERT INTO "public"."goose_db_version" VALUES (246, 29, 't', '2018-01-24 22:12:26.085203');
INSERT INTO "public"."goose_db_version" VALUES (247, 30, 't', '2018-01-24 22:12:26.087729');
INSERT INTO "public"."goose_db_version" VALUES (248, 31, 't', '2018-01-24 23:32:22.793864');
INSERT INTO "public"."goose_db_version" VALUES (249, 32, 't', '2018-01-25 16:13:49.047362');
INSERT INTO "public"."goose_db_version" VALUES (250, 33, 't', '2018-01-25 16:15:48.508509');
INSERT INTO "public"."goose_db_version" VALUES (251, 33, 'f', '2018-01-25 16:49:22.412447');
INSERT INTO "public"."goose_db_version" VALUES (252, 32, 'f', '2018-01-25 16:49:23.07758');
INSERT INTO "public"."goose_db_version" VALUES (253, 31, 'f', '2018-01-25 16:49:23.864693');
INSERT INTO "public"."goose_db_version" VALUES (254, 30, 'f', '2018-01-25 16:49:24.716064');
INSERT INTO "public"."goose_db_version" VALUES (255, 29, 'f', '2018-01-25 16:49:27.262397');
INSERT INTO "public"."goose_db_version" VALUES (256, 28, 'f', '2018-01-25 16:49:28.225893');
INSERT INTO "public"."goose_db_version" VALUES (257, 27, 'f', '2018-01-25 16:49:28.956333');
INSERT INTO "public"."goose_db_version" VALUES (258, 27, 't', '2018-01-25 16:49:35.980872');
INSERT INTO "public"."goose_db_version" VALUES (259, 28, 't', '2018-01-25 16:49:36.073361');
INSERT INTO "public"."goose_db_version" VALUES (260, 29, 't', '2018-01-25 16:49:36.084882');
INSERT INTO "public"."goose_db_version" VALUES (261, 30, 't', '2018-01-25 16:49:36.100067');
INSERT INTO "public"."goose_db_version" VALUES (262, 31, 't', '2018-01-25 16:49:36.106953');
INSERT INTO "public"."goose_db_version" VALUES (263, 32, 't', '2018-01-25 16:49:36.108991');
INSERT INTO "public"."goose_db_version" VALUES (264, 33, 't', '2018-01-25 16:49:36.112751');
INSERT INTO "public"."goose_db_version" VALUES (265, 33, 'f', '2018-01-25 16:53:02.304929');
INSERT INTO "public"."goose_db_version" VALUES (266, 32, 'f', '2018-01-25 16:53:02.845144');
INSERT INTO "public"."goose_db_version" VALUES (267, 31, 'f', '2018-01-25 16:53:03.396377');
INSERT INTO "public"."goose_db_version" VALUES (268, 30, 'f', '2018-01-25 16:53:03.924682');
INSERT INTO "public"."goose_db_version" VALUES (269, 29, 'f', '2018-01-25 16:53:04.667412');
INSERT INTO "public"."goose_db_version" VALUES (270, 28, 'f', '2018-01-25 16:53:05.545193');
INSERT INTO "public"."goose_db_version" VALUES (271, 27, 'f', '2018-01-25 16:53:06.219516');
INSERT INTO "public"."goose_db_version" VALUES (272, 27, 't', '2018-01-25 16:53:09.516968');
INSERT INTO "public"."goose_db_version" VALUES (273, 28, 't', '2018-01-25 16:53:09.560794');
INSERT INTO "public"."goose_db_version" VALUES (274, 28, 'f', '2018-01-25 16:55:31.313998');
INSERT INTO "public"."goose_db_version" VALUES (275, 27, 'f', '2018-01-25 16:55:31.853108');
INSERT INTO "public"."goose_db_version" VALUES (276, 26, 'f', '2018-01-25 16:55:32.411715');
INSERT INTO "public"."goose_db_version" VALUES (277, 25, 'f', '2018-01-25 16:55:32.944197');
INSERT INTO "public"."goose_db_version" VALUES (278, 24, 'f', '2018-01-25 16:55:33.766019');
INSERT INTO "public"."goose_db_version" VALUES (279, 23, 'f', '2018-01-25 16:55:41.73414');
INSERT INTO "public"."goose_db_version" VALUES (280, 23, 't', '2018-01-25 16:58:28.414062');
INSERT INTO "public"."goose_db_version" VALUES (281, 24, 't', '2018-01-25 16:58:28.424751');
INSERT INTO "public"."goose_db_version" VALUES (282, 25, 't', '2018-01-25 16:58:28.463465');
INSERT INTO "public"."goose_db_version" VALUES (283, 26, 't', '2018-01-25 16:58:28.476004');
INSERT INTO "public"."goose_db_version" VALUES (284, 27, 't', '2018-01-25 16:58:28.486478');
INSERT INTO "public"."goose_db_version" VALUES (285, 28, 't', '2018-01-25 16:58:28.49739');
INSERT INTO "public"."goose_db_version" VALUES (286, 29, 't', '2018-01-25 16:58:28.501267');
INSERT INTO "public"."goose_db_version" VALUES (287, 30, 't', '2018-01-25 16:58:28.532797');
INSERT INTO "public"."goose_db_version" VALUES (288, 31, 't', '2018-01-25 16:58:28.535187');
INSERT INTO "public"."goose_db_version" VALUES (289, 32, 't', '2018-01-25 16:58:28.541469');
INSERT INTO "public"."goose_db_version" VALUES (290, 33, 't', '2018-01-25 16:58:28.543322');
INSERT INTO "public"."goose_db_version" VALUES (291, 34, 't', '2018-01-25 16:58:28.546893');
INSERT INTO "public"."goose_db_version" VALUES (292, 34, 'f', '2018-01-25 17:28:23.730436');
INSERT INTO "public"."goose_db_version" VALUES (293, 33, 'f', '2018-01-25 17:28:24.518439');
INSERT INTO "public"."goose_db_version" VALUES (294, 32, 'f', '2018-01-25 17:28:25.249692');
INSERT INTO "public"."goose_db_version" VALUES (295, 31, 'f', '2018-01-25 17:28:25.942577');
INSERT INTO "public"."goose_db_version" VALUES (296, 30, 'f', '2018-01-25 17:28:26.551118');
INSERT INTO "public"."goose_db_version" VALUES (297, 29, 'f', '2018-01-25 17:28:27.180931');
INSERT INTO "public"."goose_db_version" VALUES (298, 28, 'f', '2018-01-25 17:28:27.877965');
INSERT INTO "public"."goose_db_version" VALUES (299, 27, 'f', '2018-01-25 17:28:29.087048');
INSERT INTO "public"."goose_db_version" VALUES (300, 26, 'f', '2018-01-25 17:28:33.320448');
INSERT INTO "public"."goose_db_version" VALUES (301, 25, 'f', '2018-01-25 17:28:35.340735');
INSERT INTO "public"."goose_db_version" VALUES (302, 24, 'f', '2018-01-25 17:28:38.310889');
INSERT INTO "public"."goose_db_version" VALUES (303, 24, 't', '2018-01-25 17:28:44.001045');
INSERT INTO "public"."goose_db_version" VALUES (304, 25, 't', '2018-01-25 17:28:44.008861');
INSERT INTO "public"."goose_db_version" VALUES (305, 26, 't', '2018-01-25 17:28:44.021979');
INSERT INTO "public"."goose_db_version" VALUES (306, 27, 't', '2018-01-25 17:28:44.078704');
INSERT INTO "public"."goose_db_version" VALUES (307, 28, 't', '2018-01-25 17:28:44.088581');
INSERT INTO "public"."goose_db_version" VALUES (308, 29, 't', '2018-01-25 17:28:44.125616');
INSERT INTO "public"."goose_db_version" VALUES (309, 30, 't', '2018-01-25 17:28:44.128467');
INSERT INTO "public"."goose_db_version" VALUES (310, 31, 't', '2018-01-25 17:28:44.130964');
INSERT INTO "public"."goose_db_version" VALUES (311, 32, 't', '2018-01-25 17:28:44.137013');
INSERT INTO "public"."goose_db_version" VALUES (312, 33, 't', '2018-01-25 17:28:44.1388');
INSERT INTO "public"."goose_db_version" VALUES (313, 34, 't', '2018-01-25 17:28:44.141876');
INSERT INTO "public"."goose_db_version" VALUES (314, 34, 'f', '2018-01-25 18:09:11.510135');
INSERT INTO "public"."goose_db_version" VALUES (315, 33, 'f', '2018-01-25 18:09:12.230455');
INSERT INTO "public"."goose_db_version" VALUES (316, 32, 'f', '2018-01-25 18:09:12.848861');
INSERT INTO "public"."goose_db_version" VALUES (317, 31, 'f', '2018-01-25 18:09:13.477299');
INSERT INTO "public"."goose_db_version" VALUES (318, 30, 'f', '2018-01-25 18:09:15.717349');
INSERT INTO "public"."goose_db_version" VALUES (319, 29, 'f', '2018-01-25 18:09:17.315469');
INSERT INTO "public"."goose_db_version" VALUES (320, 28, 'f', '2018-01-25 18:09:18.413108');
INSERT INTO "public"."goose_db_version" VALUES (321, 28, 't', '2018-01-25 18:09:46.133895');
INSERT INTO "public"."goose_db_version" VALUES (322, 29, 't', '2018-01-25 18:09:46.164825');
INSERT INTO "public"."goose_db_version" VALUES (323, 30, 't', '2018-01-25 18:09:46.167732');
INSERT INTO "public"."goose_db_version" VALUES (324, 31, 't', '2018-01-25 18:09:46.170288');
INSERT INTO "public"."goose_db_version" VALUES (325, 32, 't', '2018-01-25 18:09:46.176428');
INSERT INTO "public"."goose_db_version" VALUES (326, 33, 't', '2018-01-25 18:09:46.17808');
INSERT INTO "public"."goose_db_version" VALUES (327, 34, 't', '2018-01-25 18:09:46.181354');
INSERT INTO "public"."goose_db_version" VALUES (328, 34, 'f', '2018-01-25 18:27:31.742848');
INSERT INTO "public"."goose_db_version" VALUES (329, 33, 'f', '2018-01-25 18:27:32.345973');
INSERT INTO "public"."goose_db_version" VALUES (330, 32, 'f', '2018-01-25 18:27:32.886035');
INSERT INTO "public"."goose_db_version" VALUES (331, 31, 'f', '2018-01-25 18:27:33.400488');
INSERT INTO "public"."goose_db_version" VALUES (332, 30, 'f', '2018-01-25 18:27:33.841509');
INSERT INTO "public"."goose_db_version" VALUES (333, 29, 'f', '2018-01-25 18:27:34.475986');
INSERT INTO "public"."goose_db_version" VALUES (334, 28, 'f', '2018-01-25 18:27:35.139628');
INSERT INTO "public"."goose_db_version" VALUES (335, 28, 't', '2018-01-25 18:27:37.813391');
INSERT INTO "public"."goose_db_version" VALUES (336, 29, 't', '2018-01-25 18:27:37.823566');
INSERT INTO "public"."goose_db_version" VALUES (337, 30, 't', '2018-01-25 18:27:37.827272');
INSERT INTO "public"."goose_db_version" VALUES (338, 31, 't', '2018-01-25 18:27:37.830562');
INSERT INTO "public"."goose_db_version" VALUES (339, 32, 't', '2018-01-25 18:27:37.859503');
INSERT INTO "public"."goose_db_version" VALUES (340, 33, 't', '2018-01-25 18:27:37.861106');
INSERT INTO "public"."goose_db_version" VALUES (341, 34, 't', '2018-01-25 18:27:37.86421');
INSERT INTO "public"."goose_db_version" VALUES (342, 34, 'f', '2018-01-25 18:27:52.709879');
INSERT INTO "public"."goose_db_version" VALUES (343, 33, 'f', '2018-01-25 18:27:53.259134');
INSERT INTO "public"."goose_db_version" VALUES (344, 32, 'f', '2018-01-25 18:27:53.78852');
INSERT INTO "public"."goose_db_version" VALUES (345, 31, 'f', '2018-01-25 18:27:54.294468');
INSERT INTO "public"."goose_db_version" VALUES (346, 30, 'f', '2018-01-25 18:27:55.194338');
INSERT INTO "public"."goose_db_version" VALUES (347, 29, 'f', '2018-01-25 18:27:55.936526');
INSERT INTO "public"."goose_db_version" VALUES (348, 28, 'f', '2018-01-25 18:27:56.62289');
INSERT INTO "public"."goose_db_version" VALUES (349, 28, 't', '2018-01-25 18:28:00.009321');
INSERT INTO "public"."goose_db_version" VALUES (350, 29, 't', '2018-01-25 18:28:00.041993');
INSERT INTO "public"."goose_db_version" VALUES (351, 30, 't', '2018-01-25 18:28:00.044779');
INSERT INTO "public"."goose_db_version" VALUES (352, 31, 't', '2018-01-25 18:28:00.047693');
INSERT INTO "public"."goose_db_version" VALUES (353, 32, 't', '2018-01-25 18:28:00.054018');
INSERT INTO "public"."goose_db_version" VALUES (354, 33, 't', '2018-01-25 18:28:00.055884');
INSERT INTO "public"."goose_db_version" VALUES (355, 34, 't', '2018-01-25 18:28:00.059603');
INSERT INTO "public"."goose_db_version" VALUES (356, 34, 'f', '2018-01-25 18:29:14.316228');
INSERT INTO "public"."goose_db_version" VALUES (357, 33, 'f', '2018-01-25 18:29:14.823131');
INSERT INTO "public"."goose_db_version" VALUES (358, 32, 'f', '2018-01-25 18:29:15.306083');
INSERT INTO "public"."goose_db_version" VALUES (359, 31, 'f', '2018-01-25 18:29:15.79087');
INSERT INTO "public"."goose_db_version" VALUES (360, 30, 'f', '2018-01-25 18:29:16.274785');
INSERT INTO "public"."goose_db_version" VALUES (361, 29, 'f', '2018-01-25 18:29:16.791605');
INSERT INTO "public"."goose_db_version" VALUES (362, 28, 'f', '2018-01-25 18:29:17.466603');
INSERT INTO "public"."goose_db_version" VALUES (363, 28, 't', '2018-01-25 18:29:19.795803');
INSERT INTO "public"."goose_db_version" VALUES (364, 29, 't', '2018-01-25 18:29:19.801856');
INSERT INTO "public"."goose_db_version" VALUES (365, 30, 't', '2018-01-25 18:29:19.804974');
INSERT INTO "public"."goose_db_version" VALUES (366, 31, 't', '2018-01-25 18:29:19.807809');
INSERT INTO "public"."goose_db_version" VALUES (367, 32, 't', '2018-01-25 18:29:19.814531');
INSERT INTO "public"."goose_db_version" VALUES (368, 33, 't', '2018-01-25 18:29:19.816275');
INSERT INTO "public"."goose_db_version" VALUES (369, 34, 't', '2018-01-25 18:29:19.819086');
INSERT INTO "public"."goose_db_version" VALUES (370, 34, 'f', '2018-01-25 18:48:58.704327');
INSERT INTO "public"."goose_db_version" VALUES (371, 33, 'f', '2018-01-25 18:48:59.17804');
INSERT INTO "public"."goose_db_version" VALUES (372, 32, 'f', '2018-01-25 18:48:59.66236');
INSERT INTO "public"."goose_db_version" VALUES (373, 31, 'f', '2018-01-25 18:49:00.153807');
INSERT INTO "public"."goose_db_version" VALUES (374, 30, 'f', '2018-01-25 18:49:00.639525');
INSERT INTO "public"."goose_db_version" VALUES (375, 29, 'f', '2018-01-25 18:49:01.07986');
INSERT INTO "public"."goose_db_version" VALUES (376, 28, 'f', '2018-01-25 18:49:01.540972');
INSERT INTO "public"."goose_db_version" VALUES (377, 27, 'f', '2018-01-25 18:49:02.009286');
INSERT INTO "public"."goose_db_version" VALUES (378, 26, 'f', '2018-01-25 18:49:02.620319');
INSERT INTO "public"."goose_db_version" VALUES (379, 25, 'f', '2018-01-25 18:49:03.757349');
INSERT INTO "public"."goose_db_version" VALUES (380, 24, 'f', '2018-01-25 18:49:11.542952');
INSERT INTO "public"."goose_db_version" VALUES (381, 24, 't', '2018-01-25 18:57:55.285699');
INSERT INTO "public"."goose_db_version" VALUES (382, 25, 't', '2018-01-25 18:57:55.31568');
INSERT INTO "public"."goose_db_version" VALUES (383, 26, 't', '2018-01-25 18:57:55.338671');
INSERT INTO "public"."goose_db_version" VALUES (384, 27, 't', '2018-01-25 18:57:55.382121');
INSERT INTO "public"."goose_db_version" VALUES (385, 28, 't', '2018-01-25 18:57:55.413888');
INSERT INTO "public"."goose_db_version" VALUES (386, 28, 'f', '2018-01-25 18:58:21.232923');
INSERT INTO "public"."goose_db_version" VALUES (387, 27, 'f', '2018-01-25 18:58:21.896119');
INSERT INTO "public"."goose_db_version" VALUES (388, 26, 'f', '2018-01-25 18:58:22.447943');
INSERT INTO "public"."goose_db_version" VALUES (389, 25, 'f', '2018-01-25 18:58:23.426249');
INSERT INTO "public"."goose_db_version" VALUES (390, 25, 't', '2018-01-25 19:00:35.572143');
INSERT INTO "public"."goose_db_version" VALUES (391, 26, 't', '2018-01-25 19:00:35.615166');
INSERT INTO "public"."goose_db_version" VALUES (392, 27, 't', '2018-01-25 19:00:35.622749');
INSERT INTO "public"."goose_db_version" VALUES (393, 28, 't', '2018-01-25 19:00:35.632179');
INSERT INTO "public"."goose_db_version" VALUES (394, 29, 't', '2018-01-25 19:00:35.641722');
INSERT INTO "public"."goose_db_version" VALUES (395, 30, 't', '2018-01-25 19:00:35.646216');
INSERT INTO "public"."goose_db_version" VALUES (396, 31, 't', '2018-01-25 19:00:35.649516');
INSERT INTO "public"."goose_db_version" VALUES (397, 32, 't', '2018-01-25 19:00:35.665075');
INSERT INTO "public"."goose_db_version" VALUES (398, 33, 't', '2018-01-25 19:00:35.692898');
INSERT INTO "public"."goose_db_version" VALUES (399, 34, 't', '2018-01-25 19:00:35.694516');
INSERT INTO "public"."goose_db_version" VALUES (400, 35, 't', '2018-01-25 19:00:35.715495');
INSERT INTO "public"."goose_db_version" VALUES (401, 35, 'f', '2018-01-26 00:18:24.065539');
INSERT INTO "public"."goose_db_version" VALUES (402, 34, 'f', '2018-01-26 00:18:24.975972');
INSERT INTO "public"."goose_db_version" VALUES (403, 33, 'f', '2018-01-26 00:18:25.490185');
INSERT INTO "public"."goose_db_version" VALUES (404, 32, 'f', '2018-01-26 00:18:25.99062');
INSERT INTO "public"."goose_db_version" VALUES (405, 31, 'f', '2018-01-26 00:18:26.483866');
INSERT INTO "public"."goose_db_version" VALUES (406, 30, 'f', '2018-01-26 00:18:26.989644');
INSERT INTO "public"."goose_db_version" VALUES (407, 29, 'f', '2018-01-26 00:18:27.467023');
INSERT INTO "public"."goose_db_version" VALUES (408, 28, 'f', '2018-01-26 00:18:28.002305');
INSERT INTO "public"."goose_db_version" VALUES (409, 27, 'f', '2018-01-26 00:18:28.576307');
INSERT INTO "public"."goose_db_version" VALUES (410, 26, 'f', '2018-01-26 00:18:29.262596');
INSERT INTO "public"."goose_db_version" VALUES (411, 25, 'f', '2018-01-26 00:18:30.015278');
INSERT INTO "public"."goose_db_version" VALUES (412, 25, 't', '2018-01-26 00:18:32.801938');
INSERT INTO "public"."goose_db_version" VALUES (413, 26, 't', '2018-01-26 00:18:32.840659');
INSERT INTO "public"."goose_db_version" VALUES (414, 27, 't', '2018-01-26 00:18:32.850003');
INSERT INTO "public"."goose_db_version" VALUES (415, 28, 't', '2018-01-26 00:18:32.860547');
INSERT INTO "public"."goose_db_version" VALUES (416, 29, 't', '2018-01-26 00:18:32.870862');
INSERT INTO "public"."goose_db_version" VALUES (417, 30, 't', '2018-01-26 00:18:32.880837');
INSERT INTO "public"."goose_db_version" VALUES (418, 31, 't', '2018-01-26 00:18:32.900203');
INSERT INTO "public"."goose_db_version" VALUES (419, 32, 't', '2018-01-26 00:18:32.902843');
INSERT INTO "public"."goose_db_version" VALUES (420, 33, 't', '2018-01-26 00:18:32.90773');
INSERT INTO "public"."goose_db_version" VALUES (421, 34, 't', '2018-01-26 00:18:32.909418');
INSERT INTO "public"."goose_db_version" VALUES (422, 35, 't', '2018-01-26 00:18:32.912372');
INSERT INTO "public"."goose_db_version" VALUES (423, 35, 'f', '2018-01-26 00:20:26.936639');
INSERT INTO "public"."goose_db_version" VALUES (424, 34, 'f', '2018-01-26 00:20:27.422637');
INSERT INTO "public"."goose_db_version" VALUES (425, 33, 'f', '2018-01-26 00:20:28.993373');
INSERT INTO "public"."goose_db_version" VALUES (426, 32, 'f', '2018-01-26 00:20:29.387065');
INSERT INTO "public"."goose_db_version" VALUES (427, 31, 'f', '2018-01-26 00:20:29.748004');
INSERT INTO "public"."goose_db_version" VALUES (428, 30, 'f', '2018-01-26 00:20:30.130561');
INSERT INTO "public"."goose_db_version" VALUES (429, 29, 'f', '2018-01-26 00:20:30.456148');
INSERT INTO "public"."goose_db_version" VALUES (430, 28, 'f', '2018-01-26 00:20:30.83863');
INSERT INTO "public"."goose_db_version" VALUES (431, 27, 'f', '2018-01-26 00:20:31.481506');
INSERT INTO "public"."goose_db_version" VALUES (432, 26, 'f', '2018-01-26 00:20:32.166757');
INSERT INTO "public"."goose_db_version" VALUES (433, 25, 'f', '2018-01-26 00:20:32.93262');
INSERT INTO "public"."goose_db_version" VALUES (434, 25, 't', '2018-01-26 00:20:36.823803');
INSERT INTO "public"."goose_db_version" VALUES (435, 26, 't', '2018-01-26 00:20:36.860329');
INSERT INTO "public"."goose_db_version" VALUES (436, 27, 't', '2018-01-26 00:20:36.867827');
INSERT INTO "public"."goose_db_version" VALUES (437, 28, 't', '2018-01-26 00:20:36.877085');
INSERT INTO "public"."goose_db_version" VALUES (438, 29, 't', '2018-01-26 00:20:36.886411');
INSERT INTO "public"."goose_db_version" VALUES (439, 30, 't', '2018-01-26 00:20:36.890879');
INSERT INTO "public"."goose_db_version" VALUES (440, 31, 't', '2018-01-26 00:20:36.893447');
INSERT INTO "public"."goose_db_version" VALUES (441, 32, 't', '2018-01-26 00:20:36.895888');
INSERT INTO "public"."goose_db_version" VALUES (442, 33, 't', '2018-01-26 00:20:36.90085');
INSERT INTO "public"."goose_db_version" VALUES (443, 34, 't', '2018-01-26 00:20:36.902466');
INSERT INTO "public"."goose_db_version" VALUES (444, 35, 't', '2018-01-26 00:20:36.905826');
INSERT INTO "public"."goose_db_version" VALUES (445, 35, 'f', '2018-01-26 14:41:02.137038');
INSERT INTO "public"."goose_db_version" VALUES (446, 34, 'f', '2018-01-26 14:41:02.725921');
INSERT INTO "public"."goose_db_version" VALUES (447, 33, 'f', '2018-01-26 14:41:03.206124');
INSERT INTO "public"."goose_db_version" VALUES (448, 32, 'f', '2018-01-26 14:41:03.72965');
INSERT INTO "public"."goose_db_version" VALUES (449, 31, 'f', '2018-01-26 14:41:04.323958');
INSERT INTO "public"."goose_db_version" VALUES (450, 30, 'f', '2018-01-26 14:41:04.953625');
INSERT INTO "public"."goose_db_version" VALUES (451, 29, 'f', '2018-01-26 14:41:05.750264');
INSERT INTO "public"."goose_db_version" VALUES (452, 28, 'f', '2018-01-26 14:41:06.213535');
INSERT INTO "public"."goose_db_version" VALUES (453, 27, 'f', '2018-01-26 14:41:06.68611');
INSERT INTO "public"."goose_db_version" VALUES (454, 26, 'f', '2018-01-26 14:41:07.563767');
INSERT INTO "public"."goose_db_version" VALUES (455, 25, 'f', '2018-01-26 14:41:08.618122');
INSERT INTO "public"."goose_db_version" VALUES (456, 24, 'f', '2018-01-26 14:41:09.82496');
INSERT INTO "public"."goose_db_version" VALUES (457, 23, 'f', '2018-01-26 14:41:22.66349');
INSERT INTO "public"."goose_db_version" VALUES (458, 23, 't', '2018-01-26 14:41:30.076608');
INSERT INTO "public"."goose_db_version" VALUES (459, 24, 't', '2018-01-26 14:41:30.099407');
INSERT INTO "public"."goose_db_version" VALUES (460, 25, 't', '2018-01-26 14:41:30.14052');
INSERT INTO "public"."goose_db_version" VALUES (461, 26, 't', '2018-01-26 14:41:30.215698');
INSERT INTO "public"."goose_db_version" VALUES (462, 27, 't', '2018-01-26 14:41:30.227491');
INSERT INTO "public"."goose_db_version" VALUES (463, 28, 't', '2018-01-26 14:41:30.238625');
INSERT INTO "public"."goose_db_version" VALUES (464, 29, 't', '2018-01-26 14:41:30.247908');
INSERT INTO "public"."goose_db_version" VALUES (465, 30, 't', '2018-01-26 14:41:30.253829');
INSERT INTO "public"."goose_db_version" VALUES (466, 31, 't', '2018-01-26 14:41:30.256847');
INSERT INTO "public"."goose_db_version" VALUES (467, 32, 't', '2018-01-26 14:41:30.259253');
INSERT INTO "public"."goose_db_version" VALUES (468, 33, 't', '2018-01-26 14:41:30.264024');
INSERT INTO "public"."goose_db_version" VALUES (469, 34, 't', '2018-01-26 14:41:30.265793');
INSERT INTO "public"."goose_db_version" VALUES (470, 35, 't', '2018-01-26 14:41:30.268845');
INSERT INTO "public"."goose_db_version" VALUES (471, 35, 'f', '2018-01-26 14:42:41.141971');
INSERT INTO "public"."goose_db_version" VALUES (472, 34, 'f', '2018-01-26 14:42:41.623815');
INSERT INTO "public"."goose_db_version" VALUES (473, 33, 'f', '2018-01-26 14:42:42.141822');
INSERT INTO "public"."goose_db_version" VALUES (474, 32, 'f', '2018-01-26 14:42:43.705586');
INSERT INTO "public"."goose_db_version" VALUES (475, 31, 'f', '2018-01-26 14:42:44.042735');
INSERT INTO "public"."goose_db_version" VALUES (476, 30, 'f', '2018-01-26 14:42:44.369317');
INSERT INTO "public"."goose_db_version" VALUES (477, 29, 'f', '2018-01-26 14:42:44.706299');
INSERT INTO "public"."goose_db_version" VALUES (478, 28, 'f', '2018-01-26 14:42:45.032813');
INSERT INTO "public"."goose_db_version" VALUES (479, 27, 'f', '2018-01-26 14:42:45.381556');
INSERT INTO "public"."goose_db_version" VALUES (480, 26, 'f', '2018-01-26 14:42:46.112601');
INSERT INTO "public"."goose_db_version" VALUES (481, 25, 'f', '2018-01-26 14:43:15.385743');
INSERT INTO "public"."goose_db_version" VALUES (482, 24, 'f', '2018-01-26 14:43:17.131433');
INSERT INTO "public"."goose_db_version" VALUES (483, 23, 'f', '2018-01-26 14:43:19.114221');
INSERT INTO "public"."goose_db_version" VALUES (484, 23, 't', '2018-01-26 14:43:27.311827');
INSERT INTO "public"."goose_db_version" VALUES (485, 24, 't', '2018-01-26 14:43:27.320018');
INSERT INTO "public"."goose_db_version" VALUES (486, 25, 't', '2018-01-26 14:43:27.325809');
INSERT INTO "public"."goose_db_version" VALUES (487, 26, 't', '2018-01-26 14:43:27.35344');
INSERT INTO "public"."goose_db_version" VALUES (488, 27, 't', '2018-01-26 14:43:27.360971');
INSERT INTO "public"."goose_db_version" VALUES (489, 28, 't', '2018-01-26 14:43:27.379568');
INSERT INTO "public"."goose_db_version" VALUES (490, 29, 't', '2018-01-26 14:43:27.389011');
INSERT INTO "public"."goose_db_version" VALUES (491, 30, 't', '2018-01-26 14:43:27.41268');
INSERT INTO "public"."goose_db_version" VALUES (492, 31, 't', '2018-01-26 14:43:27.41561');
INSERT INTO "public"."goose_db_version" VALUES (493, 32, 't', '2018-01-26 14:43:27.418212');
INSERT INTO "public"."goose_db_version" VALUES (494, 33, 't', '2018-01-26 14:43:27.423425');
INSERT INTO "public"."goose_db_version" VALUES (495, 34, 't', '2018-01-26 14:43:27.425027');
INSERT INTO "public"."goose_db_version" VALUES (496, 35, 't', '2018-01-26 14:43:27.427917');
INSERT INTO "public"."goose_db_version" VALUES (497, 35, 'f', '2018-01-26 14:45:08.249028');
INSERT INTO "public"."goose_db_version" VALUES (498, 34, 'f', '2018-01-26 14:45:09.386671');
INSERT INTO "public"."goose_db_version" VALUES (499, 33, 'f', '2018-01-26 14:45:10.386846');
INSERT INTO "public"."goose_db_version" VALUES (500, 32, 'f', '2018-01-26 14:45:10.758539');
INSERT INTO "public"."goose_db_version" VALUES (501, 31, 'f', '2018-01-26 14:45:11.129999');
INSERT INTO "public"."goose_db_version" VALUES (502, 30, 'f', '2018-01-26 14:45:11.44492');
INSERT INTO "public"."goose_db_version" VALUES (503, 29, 'f', '2018-01-26 14:45:11.770923');
INSERT INTO "public"."goose_db_version" VALUES (504, 28, 'f', '2018-01-26 14:45:12.113421');
INSERT INTO "public"."goose_db_version" VALUES (505, 27, 'f', '2018-01-26 14:45:12.41282');
INSERT INTO "public"."goose_db_version" VALUES (506, 26, 'f', '2018-01-26 14:45:12.727434');
INSERT INTO "public"."goose_db_version" VALUES (507, 25, 'f', '2018-01-26 14:45:13.06532');
INSERT INTO "public"."goose_db_version" VALUES (508, 24, 'f', '2018-01-26 14:45:13.525976');
INSERT INTO "public"."goose_db_version" VALUES (509, 23, 'f', '2018-01-26 14:45:14.043704');
INSERT INTO "public"."goose_db_version" VALUES (510, 23, 't', '2018-01-26 14:45:19.230491');
INSERT INTO "public"."goose_db_version" VALUES (511, 24, 't', '2018-01-26 14:45:19.238634');
INSERT INTO "public"."goose_db_version" VALUES (512, 25, 't', '2018-01-26 14:45:19.244858');
INSERT INTO "public"."goose_db_version" VALUES (513, 26, 't', '2018-01-26 14:45:19.273009');
INSERT INTO "public"."goose_db_version" VALUES (514, 27, 't', '2018-01-26 14:45:19.280808');
INSERT INTO "public"."goose_db_version" VALUES (515, 28, 't', '2018-01-26 14:45:19.299545');
INSERT INTO "public"."goose_db_version" VALUES (516, 29, 't', '2018-01-26 14:45:19.309101');
INSERT INTO "public"."goose_db_version" VALUES (517, 30, 't', '2018-01-26 14:45:19.313388');
INSERT INTO "public"."goose_db_version" VALUES (518, 31, 't', '2018-01-26 14:45:19.316354');
INSERT INTO "public"."goose_db_version" VALUES (519, 32, 't', '2018-01-26 14:45:19.319152');
INSERT INTO "public"."goose_db_version" VALUES (520, 33, 't', '2018-01-26 14:45:19.3251');
INSERT INTO "public"."goose_db_version" VALUES (521, 34, 't', '2018-01-26 14:45:19.327546');
INSERT INTO "public"."goose_db_version" VALUES (522, 35, 't', '2018-01-26 14:45:19.330857');
INSERT INTO "public"."goose_db_version" VALUES (523, 36, 't', '2018-01-26 15:08:06.679223');
INSERT INTO "public"."goose_db_version" VALUES (524, 36, 'f', '2018-01-26 15:09:37.603998');
INSERT INTO "public"."goose_db_version" VALUES (525, 35, 'f', '2018-01-26 15:09:48.093448');
INSERT INTO "public"."goose_db_version" VALUES (526, 35, 't', '2018-01-26 15:12:03.036972');
INSERT INTO "public"."goose_db_version" VALUES (527, 36, 't', '2018-01-26 15:12:03.048922');
INSERT INTO "public"."goose_db_version" VALUES (528, 37, 't', '2018-01-26 21:04:45.246046');
INSERT INTO "public"."goose_db_version" VALUES (529, 37, 'f', '2018-01-26 21:06:04.695205');
INSERT INTO "public"."goose_db_version" VALUES (530, 37, 't', '2018-01-26 21:06:06.686486');
INSERT INTO "public"."goose_db_version" VALUES (531, 37, 'f', '2018-01-26 21:07:36.699894');
INSERT INTO "public"."goose_db_version" VALUES (532, 37, 't', '2018-01-26 21:14:30.734192');
INSERT INTO "public"."goose_db_version" VALUES (533, 37, 'f', '2018-01-26 21:15:31.259731');
INSERT INTO "public"."goose_db_version" VALUES (534, 37, 't', '2018-01-26 21:15:32.272983');
INSERT INTO "public"."goose_db_version" VALUES (535, 37, 'f', '2018-01-26 21:15:48.135543');
INSERT INTO "public"."goose_db_version" VALUES (536, 37, 't', '2018-01-26 21:15:49.373127');
INSERT INTO "public"."goose_db_version" VALUES (537, 37, 'f', '2018-01-26 21:33:04.507561');
INSERT INTO "public"."goose_db_version" VALUES (538, 37, 't', '2018-01-26 21:33:05.558552');
INSERT INTO "public"."goose_db_version" VALUES (539, 37, 'f', '2018-01-26 21:41:23.755777');
INSERT INTO "public"."goose_db_version" VALUES (540, 37, 't', '2018-01-26 21:41:25.16287');
INSERT INTO "public"."goose_db_version" VALUES (541, 37, 'f', '2018-01-26 21:45:30.217301');
INSERT INTO "public"."goose_db_version" VALUES (542, 37, 't', '2018-01-26 21:45:31.476004');
INSERT INTO "public"."goose_db_version" VALUES (543, 37, 'f', '2018-01-26 21:47:54.247497');
INSERT INTO "public"."goose_db_version" VALUES (544, 37, 't', '2018-01-26 21:48:36.97031');
INSERT INTO "public"."goose_db_version" VALUES (545, 37, 'f', '2018-01-26 21:49:31.781927');
INSERT INTO "public"."goose_db_version" VALUES (546, 37, 't', '2018-01-26 21:50:01.044206');
INSERT INTO "public"."goose_db_version" VALUES (547, 37, 'f', '2018-01-26 21:50:49.183411');
INSERT INTO "public"."goose_db_version" VALUES (548, 37, 't', '2018-01-26 21:50:50.432579');
INSERT INTO "public"."goose_db_version" VALUES (549, 37, 'f', '2018-01-26 21:51:37.39123');
INSERT INTO "public"."goose_db_version" VALUES (550, 37, 't', '2018-01-26 21:51:38.38122');
INSERT INTO "public"."goose_db_version" VALUES (551, 37, 'f', '2018-01-26 21:54:05.264946');
INSERT INTO "public"."goose_db_version" VALUES (552, 37, 't', '2018-01-26 21:54:06.378839');
INSERT INTO "public"."goose_db_version" VALUES (553, 37, 'f', '2018-01-26 21:55:02.539831');
INSERT INTO "public"."goose_db_version" VALUES (554, 37, 't', '2018-01-26 21:55:03.53053');
INSERT INTO "public"."goose_db_version" VALUES (555, 38, 't', '2018-01-29 16:11:04.527794');
INSERT INTO "public"."goose_db_version" VALUES (556, 39, 't', '2018-01-29 16:11:04.540515');
INSERT INTO "public"."goose_db_version" VALUES (557, 40, 't', '2018-01-29 16:13:26.248698');
INSERT INTO "public"."goose_db_version" VALUES (558, 40, 'f', '2018-01-29 16:14:58.929364');
INSERT INTO "public"."goose_db_version" VALUES (559, 39, 'f', '2018-01-29 16:15:00.594051');
INSERT INTO "public"."goose_db_version" VALUES (560, 39, 't', '2018-01-29 16:15:07.737731');
INSERT INTO "public"."goose_db_version" VALUES (561, 40, 't', '2018-01-29 16:15:07.782023');
INSERT INTO "public"."goose_db_version" VALUES (562, 40, 'f', '2018-01-29 16:19:46.128106');
INSERT INTO "public"."goose_db_version" VALUES (563, 40, 't', '2018-01-29 16:19:47.309607');
INSERT INTO "public"."goose_db_version" VALUES (564, 41, 't', '2018-01-29 22:18:25.564625');
INSERT INTO "public"."goose_db_version" VALUES (565, 42, 't', '2018-01-29 22:35:23.368218');
INSERT INTO "public"."goose_db_version" VALUES (566, 43, 't', '2018-01-31 14:33:36.511015');
INSERT INTO "public"."goose_db_version" VALUES (567, 43, 'f', '2018-01-31 14:35:30.199873');
INSERT INTO "public"."goose_db_version" VALUES (568, 43, 't', '2018-01-31 14:35:43.694527');
INSERT INTO "public"."goose_db_version" VALUES (569, 44, 't', '2018-01-31 14:39:40.488444');
INSERT INTO "public"."goose_db_version" VALUES (570, 44, 'f', '2018-01-31 14:41:04.751638');
INSERT INTO "public"."goose_db_version" VALUES (571, 43, 'f', '2018-01-31 14:41:05.696675');
INSERT INTO "public"."goose_db_version" VALUES (572, 43, 't', '2018-01-31 14:41:07.249554');
INSERT INTO "public"."goose_db_version" VALUES (573, 44, 't', '2018-01-31 14:41:07.257183');
COMMIT;

-- ----------------------------
-- Table structure for mention
-- ----------------------------
DROP TABLE IF EXISTS "public"."mention";
CREATE TABLE "public"."mention" (
  "id" int4 NOT NULL DEFAULT nextval('mention_id_seq'::regclass),
  "entityid" int4 NOT NULL,
  "controlid" int4 NOT NULL,
  "createdat" timestamptz(6) NOT NULL DEFAULT now(),
  "updatedat" timestamptz(6) NOT NULL DEFAULT now()
)
;
ALTER TABLE "public"."mention" OWNER TO "yaiebczsrnzufv";

-- ----------------------------
-- Records of mention
-- ----------------------------
BEGIN;
INSERT INTO "public"."mention" VALUES (7, 1, 1, '2018-03-31 14:56:24.623203+01', '2018-03-31 14:56:24.623203+01');
INSERT INTO "public"."mention" VALUES (8, 2, 1, '2018-03-31 14:56:24.623203+01', '2018-03-31 14:56:24.623203+01');
INSERT INTO "public"."mention" VALUES (9, 3, 1, '2018-03-31 14:56:24.623203+01', '2018-03-31 14:56:24.623203+01');
COMMIT;

-- ----------------------------
-- Table structure for participation
-- ----------------------------
DROP TABLE IF EXISTS "public"."participation";
CREATE TABLE "public"."participation" (
  "id" int4 NOT NULL DEFAULT nextval('participation_id_seq'::regclass),
  "legalentityid" int4 NOT NULL,
  "associatedentityid" int4,
  "percentage" numeric(50,47),
  "jobtitles" text[] COLLATE "pg_catalog"."default" DEFAULT '{}'::text[],
  "participationtype" "public"."participationtype" NOT NULL,
  "shareholdertype" "public"."shareholdertype" NOT NULL DEFAULT 'entity'::shareholdertype,
  "description" text COLLATE "pg_catalog"."default",
  "createdat" timestamptz(6) NOT NULL DEFAULT now(),
  "sort" int4 DEFAULT 0,
  "updatedat" timestamptz(6) NOT NULL DEFAULT now(),
  "deleted" bool NOT NULL DEFAULT false,
  "version" int4 DEFAULT 1,
  "quotas" int4
)
;
ALTER TABLE "public"."participation" OWNER TO "yaiebczsrnzufv";

-- ----------------------------
-- Records of participation
-- ----------------------------
BEGIN;
INSERT INTO "public"."participation" VALUES (1, 1, 2, NULL, '{}', 'shareholder', 'entity', NULL, '2018-03-27 17:04:45.381149+01', 1, '2018-03-27 17:04:45.381149+01', 'f', 1, 2);
INSERT INTO "public"."participation" VALUES (3, 2, 3, 100.00000000000000000000000000000000000000000000000, '{CEO}', 'both', 'entity', NULL, '2018-03-31 14:55:20.587491+01', 1, '2018-03-31 14:55:20.587491+01', 'f', 1, NULL);
INSERT INTO "public"."participation" VALUES (2, 1, 3, NULL, '{"Diretor Geral"}', 'administrator', 'entity', NULL, '2018-03-27 17:05:15.267154+01', 2, '2018-03-31 14:56:14.522037+01', 't', 2, NULL);
COMMIT;

-- ----------------------------
-- Table structure for participationaudit
-- ----------------------------
DROP TABLE IF EXISTS "public"."participationaudit";
CREATE TABLE "public"."participationaudit" (
  "id" int4 NOT NULL DEFAULT nextval('participationaudit_id_seq'::regclass),
  "stamp" timestamp(6),
  "mainrowid" int4 NOT NULL,
  "legalentityid" int4 NOT NULL,
  "associatedentityid" int4,
  "percentage" numeric(50,47),
  "jobtitles" text[] COLLATE "pg_catalog"."default",
  "participationtype" "public"."participationtype" NOT NULL,
  "shareholdertype" "public"."shareholdertype" NOT NULL,
  "description" text COLLATE "pg_catalog"."default",
  "createdat" timestamptz(6) NOT NULL,
  "sort" int4 DEFAULT 0,
  "updatedat" timestamptz(6) NOT NULL,
  "deleted" bool NOT NULL DEFAULT false,
  "version" int4 NOT NULL DEFAULT 1,
  "quotas" int4
)
;
ALTER TABLE "public"."participationaudit" OWNER TO "yaiebczsrnzufv";

-- ----------------------------
-- Records of participationaudit
-- ----------------------------
BEGIN;
INSERT INTO "public"."participationaudit" VALUES (1, '2018-03-31 14:56:14.522037', 2, 1, 3, NULL, '{"Diretor Geral"}', 'administrator', 'entity', NULL, '2018-03-27 17:05:15.267154+01', 2, '2018-03-27 17:05:15.267154+01', 'f', 1, NULL);
COMMIT;

-- ----------------------------
-- Function structure for create_mentions_for_control
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."create_mentions_for_control"();
CREATE OR REPLACE FUNCTION "public"."create_mentions_for_control"()
  RETURNS "pg_catalog"."trigger" AS $BODY$
BEGIN
	DELETE FROM Mention WHERE controlID = NEW.id;

	INSERT INTO Mention 
		(entityID, controlID) 

		WITH RECURSIVE drilldown_participations AS (
			SELECT p.legalEntityID, p.associatedEntityID
				FROM Participation AS p
				WHERE p.legalEntityID = NEW.legalEntityID
					AND p.associatedEntityID IS NOT NULL
					AND p.deleted <> true

			UNION

			SELECT a.legalEntityID, a.associatedEntityID
				FROM Participation AS a, drilldown_participations AS m
				WHERE a.legalEntityID = m.associatedEntityID
					AND a.associatedEntityID IS NOT NULL
					AND a.deleted <> true
		)

		SELECT DISTINCT associatedEntityID, NEW.id
			FROM drilldown_participations

		UNION
		
		SELECT NEW.legalEntityID, NEW.id;
	
	RETURN NEW;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

-- ----------------------------
-- Function structure for process_ui_audit
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."process_ui_audit"();
CREATE OR REPLACE FUNCTION "public"."process_ui_audit"()
  RETURNS "pg_catalog"."trigger" AS $BODY$
DECLARE
 audit_table_name text := TG_TABLE_NAME || 'audit';
BEGIN
	IF (TG_OP = 'UPDATE' AND OLD IS DISTINCT FROM NEW) THEN
		EXECUTE FORMAT('INSERT INTO %1$I
			SELECT NEXTVAL(pg_get_serial_sequence(''%1$I'', ''id'')),
				now(), ($1).*',
			audit_table_name)
			USING OLD;
		NEW.version = OLD.version + 1;

	ELSIF (TG_OP = 'INSERT') THEN
		NEW.version = 1;
	END IF;

	RETURN NEW;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

-- ----------------------------
-- Function structure for rearrange_participations_sort
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."rearrange_participations_sort"();
CREATE OR REPLACE FUNCTION "public"."rearrange_participations_sort"()
  RETURNS "pg_catalog"."trigger" AS $BODY$
 BEGIN
 --RETURN NEW;
	-- To avoid recursive trigger error
	IF (pg_trigger_depth() = 1) THEN
		-- On Insert adds last sort with the same legalentityid
		-- *Runs on normal sql insert and on changing the deleted flag to false
		IF (TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND OLD.deleted = TRUE AND NEW.deleted = FALSE)) THEN
			NEW.sort = COALESCE((
				SELECT MAX(sort) + 1 
					FROM Participation 
					WHERE legalEntityID = NEW.legalentityid
						AND deleted <> true
			), 1);
		END IF;
		
		-- On Update if sort changed, subtract or add 1 depending if the new sort is increasing or decreasing
		IF (TG_OP = 'UPDATE' AND OLD.sort <> NEW.sort AND NEW.deleted <> TRUE) THEN
			-- Is increasing
			IF (NEW.sort > OLD.sort) THEN
				UPDATE Participation 
					SET sort = sort - 1
					WHERE legalentityid = OLD.legalentityid
						AND deleted <> TRUE
						AND sort > OLD.sort AND sort <= NEW.sort;
						
			-- Is decreasing
			ELSE 
				UPDATE Participation 
					SET sort = sort + 1
					WHERE legalentityid = OLD.legalentityid
						AND deleted <> TRUE
						AND sort < OLD.sort AND sort >= NEW.sort;
			END IF;
		END IF;
		
		-- On Delete subtract 1 from the sort column if sort is bigger than the deleted one
		-- *Runs on normal sql delete and on changing the deleted flag to true
		IF ((TG_OP = 'DELETE' AND OLD.deleted <> TRUE) OR (TG_OP = 'UPDATE' AND OLD.deleted = FALSE AND NEW.deleted = TRUE)) THEN
			UPDATE Participation 
				SET sort = sort - 1
				WHERE legalentityid = OLD.legalentityid
					AND deleted <> TRUE
					AND sort > OLD.sort;
		END IF;
		
	END IF;

  RETURN NEW;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

-- ----------------------------
-- Function structure for update_column_updated_at
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."update_column_updated_at"();
CREATE OR REPLACE FUNCTION "public"."update_column_updated_at"()
  RETURNS "pg_catalog"."trigger" AS $BODY$
BEGIN
	IF (OLD IS DISTINCT FROM NEW) THEN
		NEW.updatedAt = now();
	END IF;
	RETURN NEW;	
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

-- ----------------------------
-- View structure for entityhistoryview
-- ----------------------------
DROP VIEW IF EXISTS "public"."entityhistoryview";
CREATE VIEW "public"."entityhistoryview" AS  SELECT entityaudit.id,
    entityaudit.stamp,
    entityaudit.mainrowid,
    entityaudit.name,
    entityaudit.code,
    entityaudit.entitytype,
    entityaudit.createdat,
    entityaudit.countryid,
    entityaudit.addressid,
    entityaudit.updatedat,
    entityaudit.deleted,
    entityaudit.version,
    entityaudit.revisedat,
    entityaudit.bornat
   FROM entityaudit
UNION
 SELECT 0 AS id,
    entity.updatedat AS stamp,
    entity.id AS mainrowid,
    entity.name,
    entity.code,
    entity.entitytype,
    entity.createdat,
    entity.countryid,
    entity.addressid,
    entity.updatedat,
    entity.deleted,
    entity.version,
    entity.revisedat,
    entity.bornat
   FROM entity;

-- ----------------------------
-- View structure for mentionwithcontrolinstancedateview
-- ----------------------------
DROP VIEW IF EXISTS "public"."mentionwithcontrolinstancedateview";
CREATE VIEW "public"."mentionwithcontrolinstancedateview" AS  SELECT m.id,
    m.entityid,
    m.controlid,
    m.createdat,
    m.updatedat,
    c.instancedate AS mentionedat
   FROM (mention m
     JOIN control c ON ((c.id = m.controlid)));

-- ----------------------------
-- View structure for participationhistoryview
-- ----------------------------
DROP VIEW IF EXISTS "public"."participationhistoryview";
CREATE VIEW "public"."participationhistoryview" AS  SELECT participationaudit.id,
    participationaudit.stamp,
    participationaudit.mainrowid,
    participationaudit.legalentityid,
    participationaudit.associatedentityid,
    participationaudit.percentage,
    participationaudit.jobtitles,
    participationaudit.participationtype,
    participationaudit.shareholdertype,
    participationaudit.description,
    participationaudit.createdat,
    participationaudit.sort,
    participationaudit.updatedat,
    participationaudit.deleted,
    participationaudit.version,
    participationaudit.quotas
   FROM participationaudit
UNION
 SELECT 0 AS id,
    participation.updatedat AS stamp,
    participation.id AS mainrowid,
    participation.legalentityid,
    participation.associatedentityid,
    participation.percentage,
    participation.jobtitles,
    participation.participationtype,
    participation.shareholdertype,
    participation.description,
    participation.createdat,
    participation.sort,
    participation.updatedat,
    participation.deleted,
    participation.version,
    participation.quotas
   FROM participation;

-- ----------------------------
-- View structure for addresshistoryview
-- ----------------------------
DROP VIEW IF EXISTS "public"."addresshistoryview";
CREATE VIEW "public"."addresshistoryview" AS  SELECT addressaudit.id,
    addressaudit.stamp,
    addressaudit.mainrowid,
    addressaudit.name,
    addressaudit.num,
    addressaudit.complement,
    addressaudit.postal,
    addressaudit.region,
    addressaudit.city,
    addressaudit.state,
    addressaudit.createdat,
    addressaudit.updatedat,
    addressaudit.deleted,
    addressaudit.version
   FROM addressaudit
UNION
 SELECT 0 AS id,
    address.updatedat AS stamp,
    address.id AS mainrowid,
    address.name,
    address.num,
    address.complement,
    address.postal,
    address.region,
    address.city,
    address.state,
    address.createdat,
    address.updatedat,
    address.deleted,
    address.version
   FROM address;

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."address_id_seq"
OWNED BY "public"."address"."id";
SELECT setval('"public"."address_id_seq"', 4, true);
ALTER SEQUENCE "public"."addressaudit_id_seq"
OWNED BY "public"."addressaudit"."id";
SELECT setval('"public"."addressaudit_id_seq"', 2, false);
ALTER SEQUENCE "public"."appuser_id_seq"
OWNED BY "public"."appuser"."id";
SELECT setval('"public"."appuser_id_seq"', 3, true);
ALTER SEQUENCE "public"."control_id_seq"
OWNED BY "public"."control"."id";
SELECT setval('"public"."control_id_seq"', 2, true);
ALTER SEQUENCE "public"."country_id_seq"
OWNED BY "public"."country"."id";
SELECT setval('"public"."country_id_seq"', 2, false);
ALTER SEQUENCE "public"."entity_id_seq"
OWNED BY "public"."entity"."id";
SELECT setval('"public"."entity_id_seq"', 4, true);
ALTER SEQUENCE "public"."entityaudit_id_seq"
OWNED BY "public"."entityaudit"."id";
SELECT setval('"public"."entityaudit_id_seq"', 2, false);
ALTER SEQUENCE "public"."goose_db_version_id_seq"
OWNED BY "public"."goose_db_version"."id";
SELECT setval('"public"."goose_db_version_id_seq"', 574, true);
ALTER SEQUENCE "public"."mention_id_seq"
OWNED BY "public"."mention"."id";
SELECT setval('"public"."mention_id_seq"', 10, true);
ALTER SEQUENCE "public"."participation_id_seq"
OWNED BY "public"."participation"."id";
SELECT setval('"public"."participation_id_seq"', 4, true);
ALTER SEQUENCE "public"."participationaudit_id_seq"
OWNED BY "public"."participationaudit"."id";
SELECT setval('"public"."participationaudit_id_seq"', 2, true);

-- ----------------------------
-- Triggers structure for table address
-- ----------------------------
CREATE TRIGGER "address_audit_trigger" BEFORE INSERT OR UPDATE ON "public"."address"
FOR EACH ROW
EXECUTE PROCEDURE "public"."process_ui_audit"();
CREATE TRIGGER "address_updated_at_trigger" BEFORE UPDATE ON "public"."address"
FOR EACH ROW
EXECUTE PROCEDURE "public"."update_column_updated_at"();

-- ----------------------------
-- Primary Key structure for table address
-- ----------------------------
ALTER TABLE "public"."address" ADD CONSTRAINT "address_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table addressaudit
-- ----------------------------
ALTER TABLE "public"."addressaudit" ADD CONSTRAINT "addressaudit_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Triggers structure for table appuser
-- ----------------------------
CREATE TRIGGER "app_user_updated_at_trigger" BEFORE UPDATE ON "public"."appuser"
FOR EACH ROW
EXECUTE PROCEDURE "public"."update_column_updated_at"();

-- ----------------------------
-- Uniques structure for table appuser
-- ----------------------------
ALTER TABLE "public"."appuser" ADD CONSTRAINT "appuser_email_key" UNIQUE ("email");
ALTER TABLE "public"."appuser" ADD CONSTRAINT "appuser_token_key" UNIQUE ("token");

-- ----------------------------
-- Primary Key structure for table appuser
-- ----------------------------
ALTER TABLE "public"."appuser" ADD CONSTRAINT "appuser_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Triggers structure for table control
-- ----------------------------
CREATE TRIGGER "control_updated_at_trigger" BEFORE UPDATE ON "public"."control"
FOR EACH ROW
EXECUTE PROCEDURE "public"."update_column_updated_at"();
CREATE TRIGGER "create_mentions_on_insert_control_trigger" AFTER INSERT ON "public"."control"
FOR EACH ROW
EXECUTE PROCEDURE "public"."create_mentions_for_control"();
CREATE TRIGGER "create_mentions_on_update_control_instance_date_trigger" AFTER UPDATE ON "public"."control"
FOR EACH ROW
WHEN ((old.instancedate <> new.instancedate))
EXECUTE PROCEDURE "public"."create_mentions_for_control"();

-- ----------------------------
-- Uniques structure for table control
-- ----------------------------
ALTER TABLE "public"."control" ADD CONSTRAINT "control_num_key" UNIQUE ("num");
ALTER TABLE "public"."control" ADD CONSTRAINT "control_token_key" UNIQUE ("token");

-- ----------------------------
-- Primary Key structure for table control
-- ----------------------------
ALTER TABLE "public"."control" ADD CONSTRAINT "control_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table country
-- ----------------------------
ALTER TABLE "public"."country" ADD CONSTRAINT "country_name_key" UNIQUE ("name");

-- ----------------------------
-- Primary Key structure for table country
-- ----------------------------
ALTER TABLE "public"."country" ADD CONSTRAINT "country_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table entity
-- ----------------------------
CREATE UNIQUE INDEX "unique_entity_code_index" ON "public"."entity" USING btree (
  "code" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
) WHERE code IS NOT NULL AND code <> ''::text;

-- ----------------------------
-- Triggers structure for table entity
-- ----------------------------
CREATE TRIGGER "entity_audit_trigger" BEFORE INSERT OR UPDATE ON "public"."entity"
FOR EACH ROW
EXECUTE PROCEDURE "public"."process_ui_audit"();
CREATE TRIGGER "entity_updated_at_trigger" BEFORE UPDATE ON "public"."entity"
FOR EACH ROW
EXECUTE PROCEDURE "public"."update_column_updated_at"();

-- ----------------------------
-- Primary Key structure for table entity
-- ----------------------------
ALTER TABLE "public"."entity" ADD CONSTRAINT "entity_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table entityaudit
-- ----------------------------
ALTER TABLE "public"."entityaudit" ADD CONSTRAINT "entityaudit_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table goose_db_version
-- ----------------------------
ALTER TABLE "public"."goose_db_version" ADD CONSTRAINT "goose_db_version_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Triggers structure for table mention
-- ----------------------------
CREATE TRIGGER "mention_updated_at_trigger" BEFORE UPDATE ON "public"."mention"
FOR EACH ROW
EXECUTE PROCEDURE "public"."update_column_updated_at"();

-- ----------------------------
-- Primary Key structure for table mention
-- ----------------------------
ALTER TABLE "public"."mention" ADD CONSTRAINT "mention_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table participation
-- ----------------------------
CREATE UNIQUE INDEX "unique_participations_for_shareholder_type_entity_index" ON "public"."participation" USING btree (
  "legalentityid" "pg_catalog"."int4_ops" ASC NULLS LAST,
  "associatedentityid" "pg_catalog"."int4_ops" ASC NULLS LAST
) WHERE shareholdertype = 'entity'::shareholdertype AND deleted <> true;

-- ----------------------------
-- Triggers structure for table participation
-- ----------------------------
CREATE TRIGGER "participation_audit_trigger" BEFORE INSERT OR UPDATE ON "public"."participation"
FOR EACH ROW
EXECUTE PROCEDURE "public"."process_ui_audit"();
CREATE TRIGGER "participation_sort_trigger" BEFORE INSERT OR UPDATE OR DELETE ON "public"."participation"
FOR EACH ROW
EXECUTE PROCEDURE "public"."rearrange_participations_sort"();
CREATE TRIGGER "participation_updated_at_trigger" BEFORE UPDATE ON "public"."participation"
FOR EACH ROW
EXECUTE PROCEDURE "public"."update_column_updated_at"();

-- ----------------------------
-- Checks structure for table participation
-- ----------------------------
ALTER TABLE "public"."participation" ADD CONSTRAINT "unique_associated_for_shareholder_type_entity" CHECK ((((associatedentityid IS NOT NULL) AND (shareholdertype = 'entity'::shareholdertype)) OR ((associatedentityid IS NULL) AND (shareholdertype <> 'entity'::shareholdertype))));

-- ----------------------------
-- Primary Key structure for table participation
-- ----------------------------
ALTER TABLE "public"."participation" ADD CONSTRAINT "participation_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table participationaudit
-- ----------------------------
ALTER TABLE "public"."participationaudit" ADD CONSTRAINT "participationaudit_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table addressaudit
-- ----------------------------
ALTER TABLE "public"."addressaudit" ADD CONSTRAINT "addressaudit_mainrowid_fkey" FOREIGN KEY ("mainrowid") REFERENCES "public"."address" ("id") ON DELETE CASCADE ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- ----------------------------
-- Foreign Keys structure for table control
-- ----------------------------
ALTER TABLE "public"."control" ADD CONSTRAINT "control_legalentityid_fkey" FOREIGN KEY ("legalentityid") REFERENCES "public"."entity" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table entity
-- ----------------------------
ALTER TABLE "public"."entity" ADD CONSTRAINT "entity_addressid_fkey" FOREIGN KEY ("addressid") REFERENCES "public"."address" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."entity" ADD CONSTRAINT "entity_countryid_fkey" FOREIGN KEY ("countryid") REFERENCES "public"."country" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table entityaudit
-- ----------------------------
ALTER TABLE "public"."entityaudit" ADD CONSTRAINT "entityaudit_addressid_fkey" FOREIGN KEY ("addressid") REFERENCES "public"."address" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."entityaudit" ADD CONSTRAINT "entityaudit_countryid_fkey" FOREIGN KEY ("countryid") REFERENCES "public"."country" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."entityaudit" ADD CONSTRAINT "entityaudit_mainrowid_fkey" FOREIGN KEY ("mainrowid") REFERENCES "public"."entity" ("id") ON DELETE CASCADE ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- ----------------------------
-- Foreign Keys structure for table mention
-- ----------------------------
ALTER TABLE "public"."mention" ADD CONSTRAINT "mention_controlid_fkey" FOREIGN KEY ("controlid") REFERENCES "public"."control" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."mention" ADD CONSTRAINT "mention_entityid_fkey" FOREIGN KEY ("entityid") REFERENCES "public"."entity" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table participation
-- ----------------------------
ALTER TABLE "public"."participation" ADD CONSTRAINT "participation_associatedentityid_fkey" FOREIGN KEY ("associatedentityid") REFERENCES "public"."entity" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."participation" ADD CONSTRAINT "participation_legalentityid_fkey" FOREIGN KEY ("legalentityid") REFERENCES "public"."entity" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table participationaudit
-- ----------------------------
ALTER TABLE "public"."participationaudit" ADD CONSTRAINT "participationaudit_associatedentityid_fkey" FOREIGN KEY ("associatedentityid") REFERENCES "public"."entity" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."participationaudit" ADD CONSTRAINT "participationaudit_legalentityid_fkey" FOREIGN KEY ("legalentityid") REFERENCES "public"."entity" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."participationaudit" ADD CONSTRAINT "participationaudit_mainrowid_fkey" FOREIGN KEY ("mainrowid") REFERENCES "public"."participation" ("id") ON DELETE CASCADE ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

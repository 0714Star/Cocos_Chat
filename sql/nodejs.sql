/*
 Navicat Premium Data Transfer
 Source Server         : 淮神
 Source Server Type    : MySQL
 Source Server Version : 80033
 Source Host           : localhost:3306
 Source Schema         : nodejs
 Target Server Type    : MySQL
 Target Server Version : 80033
 File Encoding         : 65001
 Date: 12/12/2023 21:29:43
 */

SET NAMES utf8mb4;

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------

-- Table structure for user

-- ----------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE
    `user` (
        `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
        `password` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
        `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
        `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
        PRIMARY KEY (`username`) USING BTREE
    ) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------

-- Records of user

-- ----------------------------

INSERT INTO `user` VALUES ('ljj', 'ljj', '杰哥', 'head3');

INSERT INTO `user` VALUES ('ry', 'ry', '任瑶', 'head1');

INSERT INTO `user` VALUES ('xhy', 'xhy', '淮神', 'head2');

INSERT INTO `user` VALUES ('yyp', 'yyp', '蓬蓬', 'head4');

SET FOREIGN_KEY_CHECKS = 1;
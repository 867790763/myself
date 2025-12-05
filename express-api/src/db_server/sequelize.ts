const { Sequelize, DataTypes } = require('sequelize');

// 创建 Sequelize 实例，并在全局启用 underscored
const sequelize = new Sequelize('my_database', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  define: { // 这里是关键配置
    underscored: true, // 启用自动下划线转换
    // 可选：同时定义时间戳字段的映射
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

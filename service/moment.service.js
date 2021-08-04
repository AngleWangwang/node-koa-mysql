const pool = require('../app/database')
class momentServer {
    // 创建评论
    async create(data) {
        const { user_id, content } = data
        const statement = `INSERT INTO moment (user_id, content) VALUES (?, ?)`
        const result = await pool.execute(statement, [user_id, content])
        return result
    }
    // 根据用户id查看所有评论以及评论的作者信息
    async getMomentListByUserid(userid) {
        const statement =  `SELECT m.content content, m.ID id, m.createTime createTime, m.updateTime updateTime, JSON_OBJECT('name', u.NAME, 'id', u.ID) user FROM moment m
        LEFT JOIN users u on u.ID=m.user_id WHERE m.user_id = ?`
        const result = await pool.execute(statement, [userid])
        return result
    }
    // 更新用户评论
    async updateByMomentId(momentId, content) {
        const statement = `UPDATE moment SET content = ? WHERE ID = ?;`
        const result = await pool.execute(statement, [content, momentId])
        return result
    }
    // 删除评论
    async removeByMomentId(momentId) {
        console.log(momentId)
        try {
            const statement = `DELETE FROM moment WHERE ID = ?`
            const result = await pool.execute(statement, [momentId])
            return result
        } catch (err) {
            console.log(err)
         }
    }
    async getPaginationList(offset, size) {
        try {
            const statement = `
            SELECT m.ID id, m.content content, m.createTime createTime, m.updateTime updateTime,
            JSON_OBJECT('id', u.ID, 'name', u.NAME) user
            FROM moment m 
            LEFT JOIN users u ON m.user_id = u.ID
            LIMIT ?, ?;
            `
            const result = await pool.execute(statement, [offset, size])
            return result
        } catch (err) {
            throw new Error(err)
        }
    }
    async getMommentDetailsById(mommentId) {
        try {
            const statement = `
                SELECT 
                    m.ID id,
                    m.content content,
                    m.createTime createTime,
                    m.updateTime updateTime,
                    JSON_OBJECT('id', u.ID, 'name', u.NAME) user,
                    (SELECT 
                        JSON_OBJECT(
                            'list', IF(COUNT(c.ID), JSON_ARRAYAGG(
                                JSON_OBJECT(
                                    'id', c.ID,
                                    'content', c.content,
                                    'commentId', c.comment_id,
                                    'createTime', c.create_time,
                                    'updateTime', c.update_time,
                                    'users', (SELECT
                                        JSON_OBJECT('id', cu.ID, 'name', cu.NAME)
                                        FROM users cu
                                        WHERE cu.ID = c.user_id 
                                    )
                                )
                            ), NULL),
                            'commentcount', COUNT(c.ID)
                        )
                    FROM comment c
                    WHERE c.momment_id = m.ID
                    ) commentinfo,
                    (SELECT 
                    JSON_OBJECT(
                        'labelCount', COUNT(l.ID),
                        'list', IF(COUNT(l.ID), JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'labelName', l.name,
                                'id', l.ID,
                                'mommentId', ml.momment_id
                            )
                        ), NULL)
                    )
                    FROM moment_label_relationship ml
                    LEFT JOIN label l ON l.ID = ml.label_id
                    WHERE ml.momment_id = m.ID
                    ) labelInfo
                FROM moment m
                LEFT JOIN users u ON m.user_id = u.ID
                WHERE m.ID = ?;
            `
            const result = await pool.execute(statement, [mommentId])
            return result
        } catch (err) {
            throw new Error(err)
        }
    }
    async createLabel(mommentId, labelId) {
        const statement = `INSERT INTO moment_label_relationship (momment_id, label_id) VALUES (?, ?);`
        try {
            const result = await pool.execute(statement, [mommentId, labelId])
            return result
            
        } catch (err) {
            throw new Error(err)
        }
    }
}
module.exports = new momentServer()
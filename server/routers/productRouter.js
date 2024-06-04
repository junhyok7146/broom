import express from 'express';
import { db } from '../db.js';
import multer from 'multer'; // multer 미들웨어를 사용하여 파일 업로드를 처리함

const productRouter = express.Router();

// Multer 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // 파일이 저장될 폴더 경로
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // 파일명 설정
    },
});
const upload = multer({ storage: storage });

// 한 개의 파일을 업로드할 때는 upload.single("photo")
// 여러 개 파일을 업로드할 때는 upload.array("photos", 5)
productRouter.post('/register', upload.single('photo'), (req, res) => {
    const { category, name, zipCode, addr1, addr2, homeType, description, productType, qty, price } = req.body;
    const photo = req.file ? req.file.filename : null;

    db.query(
        'INSERT INTO producttbl (category, name, zipCode, addr1, addr2, homeType, description, productType, qty, price, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [category, name, zipCode, addr1, addr2, homeType, description, productType, qty, price, photo],
        (err, result) => {
            if (err) {
                res.status(500).send('상품등록 실패');
                throw err;
            } else {
                res.send(result);
            }
        }
    );
});

productRouter.get('/list', (req, res) => {
    const page = parseInt(req.query.page);
    const category = req.query.category;

    const itemsPerPage = 12; // 페이지당 아이템 수
    const offset = (page - 1) * itemsPerPage; // 오프셋 계산

    let countQuery = '';
    let dataQuery = '';
    let queryParams1 = [];
    let queryParams2 = [];
    if (category === 'all') {
        countQuery = 'SELECT COUNT(*) AS totalCount FROM producttbl';
        queryParams1 = [];
        dataQuery = 'SELECT * FROM producttbl ORDER BY prNo DESC LIMIT ?, ?';
        queryParams2 = [offset, itemsPerPage];
    } else {
        countQuery = 'SELECT COUNT(*) AS totalCount FROM producttbl WHERE category=?';
        queryParams1 = [category];
        dataQuery = 'SELECT * FROM producttbl WHERE category=? ORDER BY prNo DESC LIMIT ?, ?';
        queryParams2 = [category, offset, itemsPerPage];
    }

    db.query(countQuery, queryParams1, (err, countResult) => {
        if (err) {
            res.status(500).send('레코드 카운트 가져오기 실패');
            throw err;
        } else {
            const totalCount = countResult[0].totalCount;
            db.query(dataQuery, queryParams2, (errData, dataResult) => {
                if (errData) {
                    res.status(500).send('상품목록 가져오기 실패');
                    throw errData;
                } else {
                    res.send({
                        totalCount: totalCount,
                        data: dataResult,
                    });
                }
            });
        }
    });
});

productRouter.post('/cart', (req, res) => {
    const { userNo, prNo, qty } = req.body;

    const query = `
                INSERT INTO cart (userNo, prNo, qty) VALUES (?, ?, ?)
                ON DUPLICATE KEY 
                UPDATE qty = qty + VALUES(qty)
                `;

    db.query(query, [userNo, prNo, qty], (err, cartResult) => {
        if (err) {
            res.status(500).send('장바구니 담기 실패');
            throw err;
        } else {
            res.send(cartResult);
        }
    });
});

productRouter.get('/cartList', (req, res) => {
    const userNo = req.query.no;

    const query = `
                SELECT c.cartNo, c.prNo, c.userNo, c.qty, p.category, p.name, p.zipCode, p.addr1, p.addr2, p.homeType, p.description, p.productType, p.photo, p.price
                FROM cart c
                JOIN producttbl p
                ON c.prNo = p.prNo
                WHERE c.userNo=? 
                 `;

    db.query(query, [userNo], (err, cartResult) => {
        if (err) {
            res.status(500).send('장바구니 검색 실패');
            throw err;
        } else {
            res.send(cartResult);
        }
    });
});

productRouter.get("/cartQtyUpdate", (req, res)=>{
    const {cartNo, qty} = req.query
    db.query("UPDATE cart SET qty=? WHERE cartNo=?", [qty, cartNo], (err, result)=>{
        if (err) {
            res.status(500).send("장바구니 수량 수정 실패");
            throw err
        } else {
            res.send(result)
        }
    })
})

productRouter.get("/cartItemRemove", (req, res)=>{
    const cartNo = req.query.cartNo
    db.query("DELETE FROM cart WHERE cartNo=?", [cartNo], (err, result)=>{
        if (err) {
            res.status(500).send("장바구니 아이템 삭제 실패");
            throw err
        } else {
            res.send(result)
        }
    })
})


export default productRouter;
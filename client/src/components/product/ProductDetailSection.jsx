import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Modal from '@/components/product/Modal'

const ProductDetailSectionBlock = styled.div`
  h2 {
    text-align: center;
    font-size: 30px;
    margin: 20px 0;
  }
  .content {
    display: flex;
    .photo {
      width: 300px;
      margin-right: 50px;
    }
    .info {
      flex: 1;
      #quantity { padding:5px;  }
      button {
        background: red;
        color: #fff;
        padding: 10px 20px;
        margin: 10px 0;
      }
      .btn {
        a { padding:10px 20px; background:red; color:#fff; margin:20px 5px;
          &:nth-child(2) { background:blue }
          &:nth-child(3) { background:black }
        }
      }
    }
  }
`
const KakaoMapBlock = styled.div`
.map_wrap, .map_wrap * {margin:0;padding:0;font-family:'Malgun Gothic',dotum,'돋움',sans-serif; font-size:14px;}
.map_wrap {position:relative; width:100%; height:500px;}
#menu_wrap {position:absolute;top:0;left:0;bottom:0;
    width:250px;
    margin:10px 0 30px 10px;
    padding:10px;
    overflow-y:auto;
    background:rgba(255, 255, 255, 1);
    z-index: 1;
    border-radius: 10px;
    .option { border-bottom:1px solid #000; padding-bottom:10px; 
        div {
            form {
                display:flex; 
                input { flex:1; padding-left:0.5em; height:25px;  }
                button { font-size:12px; width:35px; height:25px; margin-left:5px}
            }
        }
    }
    #placesList {
        margin-top:10px; 
        li {
            position:relative; overflow: hidden; cursor: pointer;
            line-height:1.5em;
            &:hover { color:#f00; }
        }
    }
    #pagination {
        margin-top:20px; text-align:center; 
        a { padding:2px 5px; background:#ddd; margin:0 3px; border-radius:3px;
            &.on { background:#333; color:#fff }
        }
    }
}
`

const ProductDetailSection = ({product}) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const carts = useSelector(state=>state.products.carts)
   const user = useSelector(state=>state.members.user)
   const [modalOpen, setModalOpen] = useState({open:false, what:""})
   const [qty, setQty] = useState(1)

   const onReset = ()=>{
      setModalOpen({open:false, what:""})
   }

   let kakao = window.kakao;
   const mapRef = useRef(null)
   const pageRef = useRef(null)
   const [markers, setMarkers] = useState([]);
   const [myMap, setMyMap] = useState(null);
   const [places, setPlaces] = useState([]);
   const [pagination, setPagination] = useState({});
   const [infowindow, setInfowindow] = useState(null);
   const [keyword, setKeyword] = useState("")

   const searchPlaces = ()=>{
       if (!keyword) {
           alert("키워드를 입력해주세요!!")
           return false;
       }
       let ps = new kakao.maps.services.Places();
       ps.keywordSearch(keyword, (data, status, pagination) => {
       if (status === kakao.maps.services.Status.OK) {
           console.log(data)
           setPlaces(data)
           displayPlaces(data);
           console.log(pagination)
           // 페이지 번호를 표출합니다
           setPagination(pagination)
       } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
           alert('검색 결과가 존재하지 않습니다.');
           return;
       } else if (status === kakao.maps.services.Status.ERROR) {
           alert('검색 결과 중 오류가 발생했습니다.');
           return;
       }
       }); 
   }

   const removeMarker = () => {
       markers.forEach(marker => {
           marker.setMap(null);
       });
       setMarkers([]);
   }

   const displayPlaces = (placesData) => {
       removeMarker();
       let bounds = new kakao.maps.LatLngBounds();
       placesData.forEach((place, index) => {
           let placePosition = new kakao.maps.LatLng(place.y, place.x);
           let marker = addMarker(placePosition, index);
           bounds.extend(placePosition);
           kakao.maps.event.addListener(marker, 'mouseover', function() {
               displayInfowindow(marker, place.place_name);
           });
           kakao.maps.event.addListener(marker, 'mouseout', function() {
               infowindow.close();
           });
       });
       myMap.setBounds(bounds);
   };

   const addMarker = (position, idx) => {
       let imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', 
       imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
       imgOptions =  {
           spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
           spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
           offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
       },
       markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
       marker = new kakao.maps.Marker({
           position: position, // 마커의 위치
           image: markerImage 
       });

       marker.setMap(myMap); // 지도 위에 마커를 표출합니다
       setMarkers(prevMarkers => [...prevMarkers, marker]);  // 배열에 생성된 마커를 추가합니다
       return marker;
   }

   function displayInfowindow(marker, title){
       let content = '<div style="padding:5px; z-index:1">' + title + '</div>';
       infowindow.setContent(content);
       infowindow.open(myMap, marker);
   }

   const handleClick = (e, page)=>{
       e.preventDefault(); 
       removeMarker()
       pagination.gotoPage(page);
   }

   useEffect(()=>{
       let mapOption = {
           center: new kakao.maps.LatLng(37.566826, 126.9786567),
           level: 7
       }
       let mapContainer = mapRef.current;
       let mapInstance = new kakao.maps.Map(mapContainer, mapOption)
       let infowindowInstance = new kakao.maps.InfoWindow({ zIndex: 1 });
       setMyMap(mapInstance)
       setInfowindow(infowindowInstance)
   }, [keyword])
    return (
        <ProductDetailSectionBlock className="row"> 
        <KakaoMapBlock>
            <div className="map_wrap">
                <div id="map" ref={mapRef} style={{width:'100%', height:'100%', overflow:'hidden'}}></div>
                <div id="menu_wrap" className="bg_white">
                    <div className="option">
                        <div>
                            <form onSubmit={(e)=>{ e.preventDefault(); searchPlaces()}}>
                                <input type="text" id="keyword" placeholder="영화관을 검색하세요." onChange={(e)=>setKeyword(e.target.value)} value={keyword} />  
                                <button type="submit">검색</button> 
                            </form>
                        </div>
                    </div>
                    <ul id="placesList">
                        {
                            places.map((item, index)=>(
                                <li 
                                key={index} 
                                onMouseOver={ ()=>{ displayInfowindow(markers[index], item.place_name) } }
                                onMouseOut={ ()=>infowindow.close() }
                                >
                                    {item.place_name}
                                </li>
                            ))
                        }
                    </ul>
                    <div id="pagination" ref={pageRef}>
                        {
                            Array.from(Array(pagination.last).keys()).map((page)=>(
                                <a href="#" key={page} className={ page+1==pagination.current && "on" } onClick={ (e)=>{ handleClick(e, page+1) } }>
                                    <span>{page+1}</span>
                                </a>
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        </KakaoMapBlock>
            <h2>{ product.name }</h2>
            <div className="content">
                <div className="photo">
                    <img src={`http://localhost:8001/uploads/${product.photo}`} alt={product.name} />
                </div>
                <div className="info">
                    <p>이 상품의 아이디는 { product.prNo }</p>
                    <p>카테고리 : { product.category }</p>
                    <p>가격 : { product.price.toLocaleString() }</p>
                    <p>요약설명 : <span dangerouslySetInnerHTML={{ __html: product.description }} /></p>
                    <p>
                      구매수량 : { product.inventory ? <input id="quantity" type="number" value={qty} /> : <span>품절!</span> }
                    </p>
                    <p>
                      고객만족도 : <span style={{marginRight:'10px'}}>{Math.round(product.averageRating*100)/100}점</span>
                      { 
                          Array.from({length:5}).map((_, index)=>(
                            <span 
                            key={index} 
                            style={{ color: index < product.averageRating ? 'red' : '#ddd'}}
                            >★</span>
                          ))
                      }
                    </p>
                    <div className="btn">
                    { product.inventory ?
                      <>
                        <a href="#" onClick={(e)=>{e.preventDefault();  }}>장바구니</a>
                        <a href="#" onClick={(e)=>{e.preventDefault(); setModalOpen({open:true, what:"buy"})}}>구매하기</a>
                      </>
                      : ""
                      }
                      { (user && user.userId=='tsalt@hanmail.net') && <Link to="/productModify" state={{ product  }}>상품수정</Link>}
                      { (user && user.userId=='tsalt@hanmail.net') && <a href="#" onClick={ (e)=>removeProduct(e, product.prNo) }>상품삭제</a>}
                    </div>
                </div>
            </div>
            <Modal modalOpen={modalOpen} onReset={onReset} product={product} qty={qty} />
        </ProductDetailSectionBlock>
    );
};

export default ProductDetailSection;
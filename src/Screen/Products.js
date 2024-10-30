// import React, { useEffect, useState } from "react";
// import filter from "../assets/images/filter.png";
// import "../Screen/Products.css";
// import insert from "../assets/images/insert.png";
// // import tick from "../assets/images/tick.png";
// import deleteimg from "../assets/images/delete.png";
// import eyeOn from "../assets/images/eye-on.png";
// import eyeOff from "../assets/images/eyesoff.png";
// import Swal from "sweetalert2";

// function Products() {
//   const [products, setProducts] = useState([]);
//   const [category, setCategory] = useState("");
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const getProducts = async () => {
//       const response = await fetch(
//         "https://api-h89c.onrender.com/products/getProducts"
//       );
//       const result = await response.json();
//       console.log(result.data);
//       setProducts(result.data);
//     };
//     getProducts();
//     return () => {};
//   }, []);

//   useEffect(() => {
//     const getAll = async () => {
//       const response = await fetch("https://api-h89c.onrender.com/categories");
//       const result = await response.json();
//       setCategories(result.data);
//     };
//     getAll();
//     return () => {};
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       const _result = await Swal.fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, delete it!",
//       });
//       if (!_result.isConfirmed) {
//         return;
//       }
//       const response = await fetch(
//         `https://api-h89c.onrender.com/products/${id}/delete`,
//         {
//           method: "DELETE",
//         }
//       );
//       const result = await response.json();
//       if (result.success) {
//         // reload trang
//         window.location.reload();
//         // const newProducts = products.filter(
//         //   (item) => item._id.toString() !== id.toString()
//         // );
//         // setProducts(newProducts);
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Thất bại",
//           text: "Xóa sản phẩm thất bại",
//         });
//       }
//     } catch (error) {}
//   };

//   return (
//     <div>
//       <div className="headersP">
//         <div>
//           <img className="filter-icon" src={filter} alt="icon" />
//           <div className="mb-3">
//             <div className="inside-container">
//               <label className="form-label">Danh mục:</label>
//               <select
//                 className="form-select"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//               >
//                 {categories.map((item, index) => {
//                   return (
//                     <option key={index} value={item._id}>
//                       {item.name}
//                     </option>
//                   );
//                 })}
//               </select>
//             </div>
//           </div>
//         </div>
//         <a className="insert-btn" href="/insert-Product" alt="insert">
//           Thêm mới
//         </a>
//       </div>
//       <div>
//         <table
//           className="product-table"
//           border={1}
//           cellPadding="10"
//           cellSpacing="0"
//         >
//           <thead>
//             <tr className="boder-tr">
//               <th></th>
//               <th>Hình ảnh</th>
//               <th>Danh mục</th>
//               <th>Tên sản phẩm</th>
//               <th>Đơn vị đo</th>
//               <th>Giá tiền</th>
//               <th>Mô tả</th>
//               <th>Xuất xứ</th>
//               <th>Tác vụ</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((item, index) => {
//               return (
//                 <tr className="table" key={index}>
//                   <td className="cube1">
//                     <div className="cube1-container">
//                       <img
//                         className="tick"
//                         src={item.isHidden ? eyeOff : eyeOn}
//                         alt="tick"
//                       />
//                     </div>
//                   </td>
//                   {/* <td className="cube"></td> */}
//                   {/* <td className="cube">{item.images}</td> */}
//                   <td className="cube">
//                     {item.images && item.images.length > 0 ? (
//                       <img
//                         className="imgP"
//                         src={item.images[0]}
//                         alt={item.name}
//                         width="100"
//                         height="100"
//                       />
//                     ) : (
//                       "No Image"
//                     )}
//                   </td>
//                   <td className="cube">{item.category.category_name}</td>
//                   <td className="cubeN">{item.name}</td>
//                   <td className="cube">{item.oum}</td>
//                   <td className="cube">{item.price}</td>
//                   <td className="cubeST">{item.description}</td>
//                   <td className="cube">{item.origin}</td>
//                   <td className="cubeF">
//                     <div className="btn-container">
//                       <div>
//                         <a
//                           href={`/update-Product/${item._id}`}
//                           className="update-button"
//                         >
//                           {" "}
//                           <img
//                             className="insertimg"
//                             src={insert}
//                             alt="insert"
//                           />{" "}
//                         </a>
//                       </div>
//                       <button
//                         onClick={() => handleDelete(item._id)}
//                         className="delete-button"
//                       >
//                         <img
//                           className="deleteimg"
//                           src={deleteimg}
//                           alt="delete"
//                         />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Products;
import React, { useEffect, useState } from "react";
import filter from "../assets/images/filter.png";
import "../Screen/Products.css";
import insert from "../assets/images/insert.png";
import deleteimg from "../assets/images/delete.png";
import eyeOn from "../assets/images/eye-on.png";
import eyeOff from "../assets/images/eyesoff.png";
import Swal from "sweetalert2";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    // Gọi API để lấy tất cả danh mục
    const getAllCategories = async () => {
      const response = await fetch("https://api-h89c.onrender.com/categories");
      const result = await response.json();
      setCategories(result.data);
    };
    getAllCategories();
  }, []);

  useEffect(() => {
    // Gọi API để lấy sản phẩm theo danh mục
    const getProductsByCategory = async (categoryId) => {
      let url = "https://api-h89c.onrender.com/products/getProducts";
      if (categoryId) {
        url = `https://api-h89c.onrender.com/products/filter/${categoryId}`;
      }
      const response = await fetch(url);
      const result = await response.json();
      setProducts(result.data);
    };

    // Lấy sản phẩm khi `category` thay đổi
    getProductsByCategory(category);
  }, [category]);

  const handleDelete = async (id) => {
    try {
      const _result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (!_result.isConfirmed) {
        return;
      }
      const response = await fetch(`https://api-h89c.onrender.com/products/${id}/delete`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (result.success) {
        // Cập nhật lại danh sách sản phẩm sau khi xóa
        setProducts(products.filter((item) => item._id !== id));
      } else {
        Swal.fire({
          icon: "error",
          title: "Thất bại",
          text: "Xóa sản phẩm thất bại",
        });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <div className="headersP">
        <div>
          <img className="filter-icon" src={filter} alt="icon" />
          <div className="mb-3">
            <div className="inside-container">
              <label className="form-label">Danh mục:</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Tất cả danh mục</option>
                {categories.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <a className="insert-btn" href="/insert-Product" alt="insert">
          Thêm mới
        </a>
      </div>
      <div>
        <table
          className="product-table"
          border={1}
          cellPadding="10"
          cellSpacing="0"
        >
          <thead>
            <tr className="boder-tr">
              <th></th>
              <th>Hình ảnh</th>
              <th>Danh mục</th>
              <th>Tên sản phẩm</th>
              <th>Đơn vị đo</th>
              <th>Giá tiền</th>
              <th>Mô tả</th>
              <th>Xuất xứ</th>
              <th>Tác vụ</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr className="table" key={index}>
                <td className="cube1">
                  <div className="cube1-container">
                    <img
                      className="tick"
                      src={item.isHidden ? eyeOff : eyeOn}
                      alt="tick"
                    />
                  </div>
                </td>
                <td className="cube">
                  {item.images && item.images.length > 0 ? (
                    <img
                      className="imgP"
                      src={item.images[0]}
                      alt={item.name}
                      width="100"
                      height="100"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="cube">{item.category.category_name}</td>
                <td className="cubeN">{item.name}</td>
                <td className="cube">{item.oum}</td>
                <td className="cube">{item.price}</td>
                <td className="cubeST">{item.description}</td>
                <td className="cube">{item.origin}</td>
                <td className="cubeF">
                  <div className="btn-container">
                    <a href={`/update-Product/${item._id}`} className="update-button">
                      <img className="insertimg" src={insert} alt="insert" />
                    </a>
                    <button onClick={() => handleDelete(item._id)} className="delete-button">
                      <img className="deleteimg" src={deleteimg} alt="delete" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;

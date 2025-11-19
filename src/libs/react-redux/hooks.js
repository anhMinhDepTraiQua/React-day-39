import { useContext, useEffect, useRef, useState, useCallback } from 'react';
// useSelector: hook phức tạp hơn — nó cần đảm bảo component chỉ re-render
// khi giá trị được selector trả về thay đổi theo so sánh ===
export function useSelector(selector) {
const store = useContext(Context);
if (!store) {
throw new Error(MISSING_CONTEXT_ERROR);
}


// Lưu giá trị state hiện tại và giá trị selector trước đó
// 1) Tính giá trị initial
const state = store.getState();


// Cảnh báo nếu selector là undefined / không phải function
if (typeof selector !== 'function') {
throw new Error('useSelector expects a selector function.');
}


// Gọi selector hai lần với cùng 1 state để kiểm tra nếu selector trả về object mới mỗi lần
// Nếu kết quả khác nhau (=== false) => in console.warn như yêu cầu
try {
const first = selector(state);
const second = selector(state);
if (first !== second) {
// Theo đề bài, thông báo chính xác:
console.warn('Selector unknown returned a different result when called with the same parameters. This can lead to unnecessary rerenders.');
}
} catch (e) {
// Nếu selector ném lỗi khi gọi, không xử lý thêm — để lỗi nổi lên cho dev fix selector
// Nhưng không ngăn hook tiếp tục (selector có thể vẫn được gọi khi sub xảy ra).
}


// Lưu giá trị selected hiện tại trong ref để so sánh sau này
const selectedRef = useRef();
// Lưu selector function tham chiếu để nếu user truyền inline selector thay đổi reference, vẫn hoạt động
const selectorRef = useRef(selector);
selectorRef.current = selector;


// Tính giá trị ban đầu và dùng stateLocal để trigger re-render khi selected thay đổi
const [selectedState, setSelectedState] = useState(() => selector(state));
selectedRef.current = selectedState;


// Tạo callback xử lý khi store thay đổi
const checkForUpdates = useCallback(() => {
try {
const newState = store.getState();
const newSelected = selectorRef.current(newState);


// Nếu reference khác === thì cập nhật local state để re-render
if (newSelected !== selectedRef.current) {
// Cập nhật ref trước để tránh race condition trong subscribers khác
selectedRef.current = newSelected;
setSelectedState(newSelected);
}
} catch (e) {
// Nếu selector ném lỗi khi thực hiện trong quá trình cập nhật, in ra console để dev biết
// Không ném error lên để tránh crash toàn bộ app khi có 1 selector lỗi
// (behaviour gần giống react-redux thực tế khi selector ném lỗi)
console.error('Error while running selector inside useSelector subscription:', e);
}
}, [store]);


useEffect(() => {
// Subscribe vào store. Khi có thay đổi, gọi checkForUpdates
const unsubscribe = store.subscribe(checkForUpdates);
// Sau khi subscribe, vẫn nên kiểm tra 1 lần (bảo đảm không bỏ lỡ thay đổi xảy ra ngay trước/giữa render)
checkForUpdates();


// Cleanup khi unmount
return () => {
unsubscribe();
};
}, [store, checkForUpdates]);


return selectedState;
}
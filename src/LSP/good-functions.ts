// ✅ ХОРОШО: Соблюдение LSP - функции работают с любыми подтипами
//
// ПРЕИМУЩЕСТВА:
// 1. Соблюдение контракта - функции работают с общим интерфейсом, а не конкретными типами
// 2. Отсутствие дублирования - одна функция работает со всеми типами
// 3. Истинная подстановка - функции работают с любыми подтипами
// 4. Легкость расширения - новые типы работают без изменения функций
// 5. Полиморфизм - код не знает конкретный тип, работает с интерфейсом

// Общий интерфейс для всех фигур
interface ShapeData {
    getArea(): number;
    getPerimeter(): number;
    getInfo(): string;
}

// ✅ LSP: Фабричные функции создают объекты, реализующие общий интерфейс
// Каждый объект может заменить любой другой объект того же интерфейса

function createRectangle(width: number, height: number): ShapeData {
    return {
        getArea: () => width * height,
        getPerimeter: () => 2 * (width + height),
        getInfo: () => `Rectangle: ${width}x${height}`
    };
}

function createCircle(radius: number): ShapeData {
    return {
        getArea: () => Math.PI * radius * radius,
        getPerimeter: () => 2 * Math.PI * radius,
        getInfo: () => `Circle: radius=${radius}`
    };
}

function createTriangle(side1: number, side2: number, side3: number): ShapeData {
    return {
        getArea: () => {
            const perimeter = side1 + side2 + side3;
            const s = perimeter / 2; // полупериметр для формулы Герона
            return Math.sqrt(s * (s - side1) * (s - side2) * (s - side3));
        },
        getPerimeter: () => side1 + side2 + side3,
        getInfo: () => `Triangle: sides=${side1},${side2},${side3}`
    };
}

function createSquare(side: number): ShapeData {
    return {
        getArea: () => side * side,
        getPerimeter: () => 4 * side,
        getInfo: () => `Square: side=${side}`
    };
}

// ✅ LSP: Единая функция обработки работает с любым подтипом ShapeData
// Не нужно знать конкретный тип - полиморфизм работает
function processShape(shape: ShapeData): void {
    console.log('Processing shape...');
    console.log('Info:', shape.getInfo());
    console.log('Area:', shape.getArea().toFixed(2));
    console.log('Perimeter:', shape.getPerimeter().toFixed(2));
}

// ✅ LSP: Функция для множественной обработки
// Работает с массивом любых объектов, реализующих ShapeData
function processShapes(shapes: ShapeData[]): void {
    console.log('Processing shape array...');
    shapes.forEach((shape, index) => {
        console.log(`\n--- Shape ${index + 1} ---`);
        processShape(shape);
    });
}

// ✅ LSP: Функция сравнения работает с любыми подтипами ShapeData
// Не нужно знать конкретные типы - интерфейс обеспечивает подстановку
function compareShapes(shape1: ShapeData, shape2: ShapeData): void {
    console.log('Comparing shapes:');
    console.log('Shape 1:', shape1.getInfo());
    console.log('Shape 2:', shape2.getInfo());
    console.log('Area difference:', Math.abs(shape1.getArea() - shape2.getArea()).toFixed(2));
    console.log('Perimeter difference:', Math.abs(shape1.getPerimeter() - shape2.getPerimeter()).toFixed(2));
}

// ✅ LSP: Функция для поиска фигуры с максимальной площадью
// Работает с любыми подтипами ShapeData
function findLargestShape(shapes: ShapeData[]): ShapeData | null {
    if (shapes.length === 0) return null;
    
    return shapes.reduce((largest, current) => {
        return current.getArea() > largest.getArea() ? current : largest;
    });
}

// ✅ LSP: Функция для фильтрации фигур по площади
// Работает с любыми подтипами ShapeData
function filterShapesByArea(shapes: ShapeData[], minArea: number): ShapeData[] {
    return shapes.filter(shape => shape.getArea() >= minArea);
}

// ✅ LSP: Функция для сортировки фигур по периметру
// Работает с любыми подтипами ShapeData
function sortShapesByPerimeter(shapes: ShapeData[]): ShapeData[] {
    return [...shapes].sort((a, b) => a.getPerimeter() - b.getPerimeter());
}

// Использование - демонстрация правильной подстановки
const rectangle = createRectangle(4, 6);
const circle = createCircle(5);
const triangle = createTriangle(3, 4, 5);
const square = createSquare(5);

console.log('=== Individual processing:');
processShape(rectangle);
processShape(circle);
processShape(triangle);
processShape(square);

console.log('\n=== Batch processing:');
processShapes([rectangle, circle, triangle, square]);

console.log('\n=== Shape comparison:');
compareShapes(rectangle, circle);
compareShapes(square, triangle);

console.log('\n=== Finding largest shape:');
const largest = findLargestShape([rectangle, circle, triangle, square]);
if (largest) {
    console.log('Largest shape:', largest.getInfo());
    console.log('Area:', largest.getArea().toFixed(2));
}

console.log('\n=== Filtering shapes by area (min 20):');
const largeShapes = filterShapesByArea([rectangle, circle, triangle, square], 20);
largeShapes.forEach(shape => console.log(shape.getInfo()));

console.log('\n=== Sorting shapes by perimeter:');
const sortedShapes = sortShapesByPerimeter([rectangle, circle, triangle, square]);
sortedShapes.forEach(shape => console.log(`${shape.getInfo()} - Perimeter: ${shape.getPerimeter().toFixed(2)}`)); 
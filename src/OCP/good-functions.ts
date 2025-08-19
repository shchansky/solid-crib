// ✅ ХОРОШО: Соблюдение OCP - открыт для расширения, закрыт для изменения
//
// ПРЕИМУЩЕСТВА:
// 1. ЗАКРЫТ для изменения - тип и функции обработки не меняются при добавлении новых фигур
// 2. ОТКРЫТ для расширения - новые фигуры добавляются через фабричные функции
// 3. Функциональный подход - использование типов и функций вместо классов
// 4. Легкость тестирования - тестируем только новые фабричные функции
// 5. Безопасность - нет риска сломать существующий функционал

// Тип для фигуры - ЗАКРЫТ для изменения
// ✅ OCP: Этот тип никогда не меняется при добавлении новых фигур
type ShapeData = {
    type: string;
    calculateArea: () => number;
    calculatePerimeter: () => number;
};

// Конкретные фабричные функции - ОТКРЫТЫ для расширения
// ✅ OCP: Каждая функция создает объект типа ShapeData и может быть добавлена без изменения существующего кода
function createCircle(radius: number): ShapeData {
    return {
        type: 'Circle',
        calculateArea: () => Math.PI * radius * radius,
        calculatePerimeter: () => 2 * Math.PI * radius
    };
}

function createRectangle(width: number, height: number): ShapeData {
    return {
        type: 'Rectangle',
        calculateArea: () => width * height,
        calculatePerimeter: () => 2 * (width + height)
    };
}

// ✅ OCP: Легко добавляем новые фигуры БЕЗ изменения существующих функций!
// Просто создаем новую фабричную функцию, возвращающую ShapeData
function createTriangle(base: number, height: number, side1: number, side2: number): ShapeData {
    return {
        type: 'Triangle',
        calculateArea: () => (base * height) / 2,
        calculatePerimeter: () => base + side1 + side2
    };
}

// ✅ OCP: И еще одну фигуру - тоже без изменения существующего кода!
function createSquare(side: number): ShapeData {
    return {
        type: 'Square',
        calculateArea: () => side * side,
        calculatePerimeter: () => 4 * side
    };
}

// Функция обработки - ЗАКРЫТА для изменения, работает с любыми фигурами
// ✅ OCP: Эта функция НИКОГДА не меняется при добавлении новых фигур!
// Она работает с типом ShapeData, а не с конкретными типами фигур
function processShape(shape: ShapeData): void {
    const area = shape.calculateArea();
    const perimeter = shape.calculatePerimeter();
    
    console.log(`${shape.type} - Area: ${area.toFixed(2)}, Perimeter: ${perimeter.toFixed(2)}`);
}

// Функция для множественной обработки - тоже ЗАКРЫТА для изменения
// ✅ OCP: Эта функция тоже НИКОГДА не меняется при добавлении новых фигур!
function processShapes(shapes: ShapeData[]): void {
    shapes.forEach(shape => processShape(shape));
}

// ✅ OCP: Использование - новые фигуры добавляются без изменения существующих функций
// Функции обработки работают с любыми объектами типа ShapeData
const circle = createCircle(5);
const rectangle = createRectangle(4, 6);
const triangle = createTriangle(4, 6, 5, 7);
const square = createSquare(5);

// ✅ OCP: Можем добавить еще фигуры и все будет работать без изменения существующего кода
const shapes = [circle, rectangle, triangle, square];

processShapes(shapes);

// Или обрабатывать по отдельности
console.log('\nОтдельная обработка:');
processShape(circle);
processShape(rectangle); 
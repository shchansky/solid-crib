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

// Функция обработки - ЗАКРЫТА для изменения, работает с любыми фигурами
// ✅ OCP: Эта функция НИКОГДА не меняется при добавлении новых фигур!
// Она работает с типом ShapeData, а не с конкретными типами фигур
function processShape(shape: ShapeData): {area: number, perimeter: number} {
    const area = shape.calculateArea();
    const perimeter = shape.calculatePerimeter();
    
    return {area, perimeter};
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

// ✅ OCP: Можем добавить еще фигуры и все будет работать без изменения существующего кода
const shapes = [circle, rectangle, triangle, square];
processShapes(shapes);
// Или обрабатывать по-отдельности
processShape(circle);
processShape(rectangle); 

export {}
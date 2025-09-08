// ✅ ХОРОШО: Соблюдение OCP - открыт для расширения, закрыт для изменения
//
// 📋 ОСНОВНАЯ ИДЕЯ OCP:
// 1. ✅ ЗАКРЫТ для изменения - тип и функции обработки не меняются при добавлении новых фигур
// 2. ✅ ОТКРЫТ для расширения - новые фигуры добавляются через фабричные функции
// 3. ✅ ПОЛИМОРФИЗМ - один тип, разные реализации
// 4. ✅ АБСТРАКЦИИ - код работает с типом ShapeData, а не с конкретными типами
//
// ✨ ПРЕИМУЩЕСТВА:
// 1. ЗАКРЫТ для изменения - тип и функции обработки не меняются при добавлении новых фигур
// 2. ОТКРЫТ для расширения - новые фигуры добавляются через фабричные функции
// 3. Функциональный подход - использование типов и функций вместо классов
// 4. Легкость тестирования - тестируем только новые фабричные функции
// 5. Безопасность - нет риска сломать существующий функционал

// ✅ OCP: Базовый интерфейс для фигуры - ЗАКРЫТ для изменения
// 💡 ПРЕИМУЩЕСТВО: Этот тип никогда не меняется при добавлении новых фигур
// 🎯 РЕЗУЛЬТАТ: Стабильная основа для всех фигур
interface ShapeData {
    calculateArea: () => number;
    calculatePerimeter: () => number;
};

//Расширяем базовый интерфейс для круга
interface CircleShapeData extends ShapeData {
    radius: number;
}

//Расширяем базовый интерфейс для прямоугольника
interface RectangleShapeData extends ShapeData {
    width: number;
    height: number;
}

// ✅ OCP: Конкретные фабричные функции - ОТКРЫТЫ для расширения
// 💡 ПРЕИМУЩЕСТВО: Каждая функция создает объект типа ShapeData и может быть добавлена без изменения существующего кода
// 🎯 РЕЗУЛЬТАТ: Легкость добавления новых типов


function createCircle(radius: number): CircleShapeData {
    return {
        calculateArea: () => Math.PI * radius * radius,
        calculatePerimeter: () => 2 * Math.PI * radius,
        radius
    };
}

function createRectangle(width: number, height: number): RectangleShapeData {
    return {
        calculateArea: () => width * height,
        calculatePerimeter: () => 2 * (width + height),
        width,
        height
    };
}

// ✅ OCP: Функция обработки - ЗАКРЫТА для изменения, работает с любыми фигурами
// 💡 ПРЕИМУЩЕСТВО: Эта функция НИКОГДА не меняется при добавлении новых фигур!
// 🎯 РЕЗУЛЬТАТ: Она работает с типом ShapeData, а не с конкретными типами фигур
function processShape(shape: ShapeData): {area: number, perimeter: number} {
    // ✅ OCP: Работаем с абстракцией ShapeData
    // 💡 ПРЕИМУЩЕСТВО: Не нужно знать конкретный тип фигуры
    // 🎯 РЕЗУЛЬТАТ: Полиморфизм работает автоматически
    const area = shape.calculateArea();
    const perimeter = shape.calculatePerimeter();
    
    return {area, perimeter};
}

// ✅ OCP: Функция для множественной обработки - тоже ЗАКРЫТА для изменения
// 💡 ПРЕИМУЩЕСТВО: Эта функция тоже НИКОГДА не меняется при добавлении новых фигур!
// 🎯 РЕЗУЛЬТАТ: Работает с любыми объектами типа ShapeData
function processShapes(shapes: ShapeData[]): void {
    shapes.forEach(shape => processShape(shape));
}

// ✅ OCP: Использование - новые фигуры добавляются без изменения существующих функций
// 💡 ПРЕИМУЩЕСТВО: Функции обработки работают с любыми объектами типа ShapeData
// 🎯 РЕЗУЛЬТАТ: Гибкость и расширяемость
const circle = createCircle(5);
const rectangle = createRectangle(4, 6);

// ✅ ДЕМОНСТРАЦИЯ: Можем добавить еще фигуры и все будет работать без изменения существующего кода
processShapes([circle, rectangle]);
// Или обрабатывать по-отдельности
processShape(circle);
processShape(rectangle);

export {}
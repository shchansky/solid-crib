// ✅ ХОРОШО: Соблюдение OCP - открыт для расширения, закрыт для изменения
//
// 🔓 ОСНОВНАЯ ИДЕЯ OCP:
// 1. ✅ ЗАКРЫТ для изменения - тип и функции обработки не меняются при добавлении новых фигур
// 2. ✅ ОТКРЫТ для расширения - новые фигуры добавляются через фабричные функции
// 3. ✅ ПОЛИМОРФИЗМ - один тип, разные реализации
// 4. ✅ АБСТРАКЦИИ - код работает с типом ShapeData, а не с конкретными типами
//
// ПРЕИМУЩЕСТВА:
// 1. ЗАКРЫТ для изменения - тип и функции обработки не меняются при добавлении новых фигур
// 2. ОТКРЫТ для расширения - новые фигуры добавляются через фабричные функции
// 3. Функциональный подход - использование типов и функций вместо классов
// 4. Легкость тестирования - тестируем только новые фабричные функции
// 5. Безопасность - нет риска сломать существующий функционал

// ✅ OCP: Тип для фигуры - ЗАКРЫТ для изменения
// 💡 ПРЕИМУЩЕСТВО: Этот тип никогда не меняется при добавлении новых фигур
// 🎯 РЕЗУЛЬТАТ: Стабильная основа для всех фигур
type ShapeData = {
    type: string;
    calculateArea: () => number;
    calculatePerimeter: () => number;
};

// ✅ OCP: Конкретные фабричные функции - ОТКРЫТЫ для расширения
// 💡 ПРЕИМУЩЕСТВО: Каждая функция создает объект типа ShapeData и может быть добавлена без изменения существующего кода
// 🎯 РЕЗУЛЬТАТ: Легкость добавления новых типов
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

// ✅ OCP: Можем добавить еще фигуры и все будет работать без изменения существующего кода
const shapes = [circle, rectangle];
processShapes(shapes);
// Или обрабатывать по-отдельности
processShape(circle);
processShape(rectangle);

// ✅ ДЕМОНСТРАЦИЯ: Легкость добавления новых фигур
// 💡 ПРЕИМУЩЕСТВО: Можно добавить Triangle без изменения существующих функций
// 🎯 РЕЗУЛЬТАТ: Принцип открытости/закрытости работает
function createTriangle(side1: number, side2: number, side3: number): ShapeData {
    return {
        type: 'Triangle',
        calculateArea: () => {
            const s = (side1 + side2 + side3) / 2;
            return Math.sqrt(s * (s - side1) * (s - side2) * (s - side3));
        },
        calculatePerimeter: () => side1 + side2 + side3
    };
}

function createSquare(side: number): ShapeData {
    return {
        type: 'Square',
        calculateArea: () => side * side,
        calculatePerimeter: () => 4 * side
    };
}

// ✅ Новая фигура работает без изменения существующих функций
const triangle = createTriangle(3, 4, 5);
const square = createSquare(5);
const allShapes = [circle, rectangle, triangle, square];
processShapes(allShapes);

// ✅ ДЕМОНСТРАЦИЯ: Легкость тестирования
// 💡 ПРЕИМУЩЕСТВО: Можно создать мок-объекты для тестирования
// 🎯 РЕЗУЛЬТАТ: Изолированное тестирование компонентов
function createMockShape(): ShapeData {
    return {
        type: 'Mock',
        calculateArea: () => 10,
        calculatePerimeter: () => 20
    };
}

export {}
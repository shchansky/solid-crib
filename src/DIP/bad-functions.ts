// ❌ ПЛОХО: Нарушение DIP - функции зависят от конкретных реализаций
//
// 🔄 НАРУШЕНИЕ DIP:
// 1. ❌ ВЫСОКОУРОВНЕВЫЕ ФУНКЦИИ ЗАВИСЯТ ОТ НИЗКОУРОВНЕВЫХ
//    - calculateArea зависит от конкретных типов Circle, Rectangle
//    - processShapes создает конкретные объекты внутри себя
//
// 2. ❌ НЕТ АБСТРАКЦИЙ
//    - Нет общего типа Shape
//    - Функции работают с конкретными типами
//
// ПРОБЛЕМЫ:
// 1. Жесткая связанность - функции зависят от конкретных типов
// 2. Сложность тестирования - нельзя легко заменить зависимости
// 3. Сложность расширения - добавление новых фигур требует изменения функций

// ❌ НАРУШЕНИЕ DIP: Конкретные типы для фигур
type Circle = {
    radius: number;
    getArea: () => number;
    getInfo: () => string;
};

type Rectangle = {
    width: number;
    height: number;
    getArea: () => number;
    getInfo: () => string;
};

// ❌ НАРУШЕНИЕ DIP: Функции создают конкретные объекты
function createCircle(radius: number): Circle {
    return {
        radius,
        getArea: () => Math.PI * radius * radius,
        getInfo: () => `Circle: radius=${radius}`
    };
}

// ❌ НАРУШЕНИЕ DIP: Функции создают конкретные объекты
function createRectangle(width: number, height: number): Rectangle {
    return {
        width,
        height,
        getArea: () => width * height,
        getInfo: () => `Rectangle: ${width}x${height}`
    };
}

// ❌ НАРУШЕНИЕ DIP: Функции зависят от конкретных типов
// 🔄 ПРОБЛЕМА: Высокоуровневая функция зависит от низкоуровневых типов
function calculateArea(shape: Circle | Rectangle): number {
    // ❌ ПРОБЛЕМА: Нужно знать конкретный тип для правильной обработки
    if ('radius' in shape) {
        return shape.getArea(); // Circle
    } else {
        return shape.getArea(); // Rectangle
    }
}

// ❌ НАРУШЕНИЕ DIP: Функция создает конкретные объекты внутри себя
function processShapes(): number {
    // ❌ ПРОБЛЕМА: Функция создает конкретные зависимости внутри себя
    const circle = createCircle(5);
    const rectangle = createRectangle(4, 6);
    
    return calculateArea(circle) + calculateArea(rectangle);
}

// ❌ НАРУШЕНИЕ DIP: Функция для отображения зависит от конкретных типов
function displayShapeInfo(shape: Circle | Rectangle): string {
    // ❌ ПРОБЛЕМА: Нужно знать конкретный тип
    if ('radius' in shape) {
        return `Circle area: ${shape.getArea()}`;
    } else {
        return `Rectangle area: ${shape.getArea()}`;
    }
}

// // Использование - демонстрация проблем

// processShapes();

// const circle = createCircle(3);
// const rectangle = createRectangle(2, 4);

// displayShapeInfo(circle);
// displayShapeInfo(rectangle); 
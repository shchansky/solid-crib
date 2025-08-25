// ✅ ХОРОШО: Соблюдение DIP - функции зависят от абстракций, а не от конкретных реализаций
//
// 🔄 ОСНОВНАЯ ИДЕЯ DIP:
// 1. ✅ ВЫСОКОУРОВНЕВЫЕ ФУНКЦИИ НЕ ЗАВИСЯТ ОТ НИЗКОУРОВНЕВЫХ
//    - calculateArea, displayInfo зависят от типа Shape (абстракция)
//    - НЕ зависят от конкретных типов Circle, Rectangle
//
// 2. ✅ ОБА ТИПА ЗАВИСЯТ ОТ АБСТРАКЦИЙ
//    - Высокоуровневые функции: calculateArea зависит от Shape
//    - Низкоуровневые функции: createCircle, createRectangle возвращают Shape
//
// ПРЕИМУЩЕСТВА:
// 1. Слабая связанность - функции зависят от абстракций
// 2. Легкость тестирования - можно легко заменить зависимости
// 3. Простота расширения - добавление новых типов не требует изменения функций

// ✅ DIP: Абстракция (тип) - высокоуровневые функции зависят от неё
type Shape = {
    getArea: () => number;
    getInfo: () => string;
};

// ✅ DIP: Конкретные реализации - низкоуровневые функции создают объекты
function createCircle(radius: number): Shape {
    return {
        getArea: () => Math.PI * radius * radius,
        getInfo: () => `Circle: radius=${radius}`
    };
}

function createRectangle(width: number, height: number): Shape {
    return {
        getArea: () => width * height,
        getInfo: () => `Rectangle: ${width}x${height}`
    };
}

// ✅ DIP: Высокоуровневые функции зависят от абстракции
// 🔄 ПРИНЦИП: Высокоуровневые функции не должны зависеть от низкоуровневых
function calculateArea(shape: Shape): number {
    // ✅ Работаем с абстракцией Shape, а не с конкретными типами
    return shape.getArea();
}

function displayShapeInfo(shape: Shape): void {
    // ✅ Работаем с абстракцией Shape, а не с конкретными типами
    console.log(`${shape.getInfo()} - Area: ${shape.getArea().toFixed(2)}`);
}

function findLargestShape(shapes: Shape[]): Shape | null {
    if (shapes.length === 0) return null;
    
    return shapes.reduce((largest, current) => {
        return current.getArea() > largest.getArea() ? current : largest;
    });
}

// ✅ DIP: Функция для обработки фигур - зависит от абстракций
function processShapes(shapes: Shape[]): void {
    console.log('Processing shapes...');
    shapes.forEach(shape => {
        displayShapeInfo(shape);
    });
    
    const largest = findLargestShape(shapes);
    if (largest) {
        console.log(`\nLargest shape: ${largest.getInfo()}`);
    }
}

// Использование - демонстрация правильного применения DIP

// Создание фигур (в реальном приложении это делается через DI контейнер)
const circle = createCircle(5);
const rectangle = createRectangle(4, 6);

// ✅ DIP: Высокоуровневые функции работают с абстракциями
console.log('=== Good DIP Example ===');
displayShapeInfo(circle);
displayShapeInfo(rectangle);

console.log('\n=== Processing shapes ===');
processShapes([circle, rectangle]); 

export {}

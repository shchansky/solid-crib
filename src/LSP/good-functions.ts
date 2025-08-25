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
    // Жесткий формат: "ИМЯ: Area=ЧИСЛО, Perimeter=ЧИСЛО"
    getInfo(): `${string}: Area=${string}, Perimeter=${string}`;
}

// ✅ LSP: Фабричные функции создают объекты, реализующие общий интерфейс
// Каждый объект может заменить любой другой объект того же интерфейса

function createRectangle(width: number, height: number): ShapeData {
    return {
        getArea: () => width * height,
        getPerimeter: () => 2 * (width + height),
        getInfo: () => `Rectangle: Area=${(width * height).toFixed(2)}, Perimeter=${(2 * (width + height)).toFixed(2)}`
    };
}

function createCircle(radius: number): ShapeData {
    return {
        getArea: () => Math.PI * radius * radius,
        getPerimeter: () => 2 * Math.PI * radius,
        getInfo: () => `Circle: Area=${(Math.PI * radius * radius).toFixed(2)}, Perimeter=${(2 * Math.PI * radius).toFixed(2)}`
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
        getInfo: () => {
            const area = (() => {
                const perimeter = side1 + side2 + side3;
                const s = perimeter / 2;
                return Math.sqrt(s * (s - side1) * (s - side2) * (s - side3));
            })();
            const perimeter = side1 + side2 + side3;
            return `Triangle: Area=${area.toFixed(2)}, Perimeter=${perimeter.toFixed(2)}`;
        }
    };
}

// ✅ LSP: Единая функция обработки работает с любым подтипом ShapeData
// Не нужно знать конкретный тип - полиморфизм работает
function processShape(shape: ShapeData): {info: string, area: number, perimeter: number} {
    return {
        info: shape.getInfo(),
        area: shape.getArea(),
        perimeter: shape.getPerimeter()
    }
}

// ✅ LSP: Функция для множественной обработки с суммарными значениями
// Работает с массивом любых объектов, реализующих ShapeData
function processShapes(shapes: ShapeData[]): {summaryArea: number, summaryPerimeter: number, summaryInfo: string[]} {
    let summaryArea = 0;
    let summaryPerimeter = 0;
    let summaryInfo: string[] = [];

    shapes.forEach((shape) => {
        summaryArea += shape.getArea();
        summaryPerimeter += shape.getPerimeter();
        summaryInfo.push(shape.getInfo());
    });

    return {
        summaryArea,
        summaryPerimeter,
        summaryInfo
    };
}






// Использование - демонстрация правильной подстановки
const rectangle = createRectangle(4, 6);
const circle = createCircle(5);
const triangle = createTriangle(3, 4, 5);

const rectangleData = processShape(rectangle);
const circleData = processShape(circle);
const triangleData = processShape(triangle);

const shapes = processShapes([rectangle, circle, triangle]);



export {}
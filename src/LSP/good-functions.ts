// ✅ ХОРОШО: Соблюдение LSP - функции работают с любыми подтипами
//
// 🔄 ОСНОВНАЯ ИДЕЯ LSP:
// 1. ✅ СОБЛЮДЕНИЕ КОНТРАКТА - функции работают с общим интерфейсом, а не конкретными типами
// 2. ✅ ОТСУТСТВИЕ ДУБЛИРОВАНИЯ - одна функция работает со всеми типами
// 3. ✅ ИСТИННАЯ ПОДСТАНОВКА - функции работают с любыми подтипами
// 4. ✅ ЛЕГКОСТЬ РАСШИРЕНИЯ - новые типы работают без изменения функций
// 5. ✅ ПОЛИМОРФИЗМ - код не знает конкретный тип, работает с интерфейсом
//
// ПРЕИМУЩЕСТВА:
// 1. Соблюдение контракта - функции работают с общим интерфейсом, а не конкретными типами
// 2. Отсутствие дублирования - одна функция работает со всеми типами
// 3. Истинная подстановка - функции работают с любыми подтипами
// 4. Легкость расширения - новые типы работают без изменения функций
// 5. Полиморфизм - код не знает конкретный тип, работает с интерфейсом

// ✅ LSP: Общий интерфейс для всех фигур
// 💡 ПРЕИМУЩЕСТВО: Четкий контракт, который все объекты должны соблюдать
// 🎯 РЕЗУЛЬТАТ: Предсказуемое поведение всех подтипов
interface ShapeData {
    getArea(): number;
    getPerimeter(): number;
    // Жесткий формат: "ИМЯ: Area=ЧИСЛО, Perimeter=ЧИСЛО"
    getInfo(): `${string}: Area=${string}, Perimeter=${string}`;
}

// ✅ LSP: Фабричные функции создают объекты, реализующие общий интерфейс
// 💡 ПРЕИМУЩЕСТВО: Каждый объект может заменить любой другой объект того же интерфейса
// 🎯 РЕЗУЛЬТАТ: Истинная подстановка работает

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
// 💡 ПРЕИМУЩЕСТВО: Не нужно знать конкретный тип - полиморфизм работает
// 🎯 РЕЗУЛЬТАТ: Любой объект, реализующий ShapeData, может быть обработан
function processShape(shape: ShapeData): {info: string, area: number, perimeter: number} {
    return {
        info: shape.getInfo(),
        area: shape.getArea(),
        perimeter: shape.getPerimeter()
    }
}

// ✅ LSP: Функция для множественной обработки с суммарными значениями
// 💡 ПРЕИМУЩЕСТВО: Работает с массивом любых объектов, реализующих ShapeData
// 🎯 РЕЗУЛЬТАТ: Полиморфизм работает автоматически
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

// ✅ ДЕМОНСТРАЦИЯ ПРЕИМУЩЕСТВ: Правильная подстановка
// 💡 ПРЕИМУЩЕСТВО: Любой объект, реализующий ShapeData, может быть обработан
// 🎯 РЕЗУЛЬТАТ: Предсказуемое поведение системы
const rectangle = createRectangle(4, 6);
const circle = createCircle(5);
const triangle = createTriangle(3, 4, 5);

const rectangleData = processShape(rectangle);
const circleData = processShape(circle);
const triangleData = processShape(triangle);

const shapes = processShapes([rectangle, circle, triangle]);

// ✅ ДЕМОНСТРАЦИЯ: Легкость добавления новых типов
// 💡 ПРЕИМУЩЕСТВО: Можно добавить Square без изменения существующих функций
// 🎯 РЕЗУЛЬТАТ: Принцип подстановки Лисков работает
function createSquare(side: number): ShapeData {
    return {
        getArea: () => side * side,
        getPerimeter: () => 4 * side,
        getInfo: () => `Square: Area=${(side * side).toFixed(2)}, Perimeter=${(4 * side).toFixed(2)}`
    };
}

// ✅ Новая фигура работает без изменения существующих функций
const square = createSquare(5);
processShape(square);
processShapes([rectangle, circle, triangle, square]);

// ✅ ДЕМОНСТРАЦИЯ: Легкость тестирования
// 💡 ПРЕИМУЩЕСТВО: Можно создать мок-объекты для тестирования
// 🎯 РЕЗУЛЬТАТ: Изолированное тестирование компонентов
function createMockShape(): ShapeData {
    return {
        getArea: () => 10,
        getPerimeter: () => 20,
        getInfo: () => `Mock: Area=10.00, Perimeter=20.00`
    };
}

export {}
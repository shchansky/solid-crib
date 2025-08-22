// ✅ ХОРОШО: Соблюдение ISP - тонкие типы, которые содержат только нужные методы
//
// ПРЕИМУЩЕСТВА:
// 1. Тонкие типы - содержат только необходимые методы
// 2. Добровольная зависимость - функции зависят только от нужных методов
// 3. Соблюдение принципа единственной ответственности - функции знают только о своей области
// 4. Легкость тестирования - можно создавать объекты только с нужными методами
// 5. Гибкость - функции работают с любыми объектами, имеющими нужные методы

// ✅ ISP: Тонкие типы для разных областей ответственности

// Базовый тип для всех фигур - только основные методы
type IspGoodShapeData = {
    getArea: () => number;
    getPerimeter: () => number;
    getInfo: () => string;
};

// Расширенный тип для круга
type CircleShapeData = IspGoodShapeData & {
    getDiametr: () => number;
};

// Расширенный тип для прямоугольника
type RectangleShapeData = IspGoodShapeData & {
    getDiagonal: () => number;
};

// ✅ ISP: Фабричные функции создают объекты только с нужными методами

function ispGoodCreateCircle(radius: number): CircleShapeData {
    return {
        getArea: () => Math.PI * radius * radius,
        getPerimeter: () => 2 * Math.PI * radius,
        getInfo: () => `Circle: radius=${radius}`,
        getDiametr: () => radius * 2,
    };
}

function ispGoodCreateRectangle(width: number, height: number): RectangleShapeData {
    return {
        getArea: () => width * height,
        getPerimeter: () => 2 * (width + height),
        getInfo: () => `Rectangle: ${width}x${height}`,
        getDiagonal: () => Math.sqrt(width * width + height * height),
    };
}

//Применение

const ispGoodCreateShapeFactory = {
    // Фабричная функция для круга
    circle: (radius: number) => {
        const circle = ispGoodCreateCircle(radius);
        return {
            area: circle.getArea(),
            perimeter: circle.getPerimeter(),
            info: circle.getInfo(),
            diameter: circle.getDiametr(),
        };
    },
    
    // Фабричная функция для прямоугольника
    rectangle: (width: number, height: number) => {
        const rectangle = ispGoodCreateRectangle(width, height);
        return {
            area: rectangle.getArea(),
            perimeter: rectangle.getPerimeter(),
            info: rectangle.getInfo(),
            diagonal: rectangle.getDiagonal(),
        };
    }
};

const ispGoodCircleData = ispGoodCreateShapeFactory.circle(10);
const ispGoodRectangleData = ispGoodCreateShapeFactory.rectangle(4, 6);

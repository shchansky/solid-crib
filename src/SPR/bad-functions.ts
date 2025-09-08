// ❌ Нарушение SRP - одна функция делает всё для всех фигур
//
// 1. ❌ МНОЖЕСТВЕННЫЕ ОТВЕТСТВЕННОСТИ - одна функция знает о всех типах фигур
// 2. ❌ СМЕШАННАЯ ЛОГИКА - валидация, расчеты, обработка ошибок в одной функции
// 3. ❌ НЕЧЕТКИЕ ГРАНИЦЫ - функция делает слишком много разных вещей
// 4. ❌ СЛОЖНОСТЬ ИЗМЕНЕНИЯ - изменение одной фигуры влияет на всю функцию
// 5. ❌ СЛОЖНОСТЬ ТЕСТИРОВАНИЯ - нужно тестировать всю логику сразу

function processShape(shapeType: 'circle' | 'rectangle', radius?: number, width?: number, height?: number): {area: number, perimeter: number} {
    if (shapeType === 'circle') {
        // ❌ ОТВЕТСТВЕННОСТЬ 1: Валидация круга
        if (!radius || radius <= 0) throw new Error('Invalid circle radius');
        
        // ❌ ОТВЕТСТВЕННОСТЬ 2: Расчет площади круга
        const area = Math.PI * radius * radius;
        
        // ❌ ОТВЕТСТВЕННОСТЬ 3: Расчет периметра круга
        const perimeter = 2 * Math.PI * radius;
        
        return {area, perimeter};

    } else if (shapeType === 'rectangle') {
        // ❌ ОТВЕТСТВЕННОСТЬ 1: Валидация прямоугольника
        if (!width || !height || width <= 0 || height <= 0) {
            throw new Error('Invalid rectangle dimensions');
        }
        
        // ❌ ОТВЕТСТВЕННОСТЬ 2: Расчет площади прямоугольника
        const area = width * height;
        
        // ❌ ОТВЕТСТВЕННОСТЬ 3: Расчет периметра прямоугольника
        const perimeter = 2 * (width + height);
        
        return {area, perimeter};
    }

    throw new Error('Invalid shape type')
}

// ❌ ДЕМОНСТРАЦИЯ ПРОБЛЕМ: Сложность использования
// 💡 ЧТО НЕ ТАК: Одна функция пытается обработать все типы фигур
// 🎯 РЕЗУЛЬТАТ: Путаница и сложность
const circleParams = processShape('circle', 5);
const rectangleParams = processShape('rectangle', undefined, 4, 6);


export {}

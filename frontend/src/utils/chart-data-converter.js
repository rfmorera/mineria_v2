import React from "react";

function compose_data(raw, source, target) {
  if (raw === null) {
    return null;
  }
  var ans;

  ans = raw.map((item) => {
    var obj = {};
    for (let index = 0; index < source.length; index++) {
      obj[target[index]] = item[source[index]];
    }

    return obj;
  });

  return ans;
}

function resume_data(raw, source, target, ans = {}) {
  var counters = new Uint32Array(source.length);
  raw.map((item) => {
    for (let index = 0; index < source.length; index++) {
      counters[index] += item[source[index]];
    }
  });

  for (let index = 0; index < target.length; index++) {
    ans[target[index]] = counters[index];
  }

  return ans;
}

function convert_to_pie(data, source, label) {
  var data = resume_data(
    data,
    source,
    source,
    {}
  );

  var ans = [];
  for (let index = 0; index < label.length; index++) {
    ans.push({
      id: label[index].toLowerCase(),
      label: label[index],
      value: data[source[index]],
    });
  }

  return ans;
}

export default compose_data;
export { resume_data, convert_to_pie };

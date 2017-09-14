import Mock from 'mockjs'
export function mockUser () {
  Mock.mock('/api/user', {
  // 属性 list 的值是一个数组，其中含有 4 到 6 个元素
    'peoples|4-6': [{
      'department': '部门岗位',
      // 属性 list 的值是一个数组，其中含有 4 到 6 个元素
      'peopleInfo|4-6': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'user_id|+1': 1,
        'user_name': '@cname',
        'job_name': '职位'
      }]
    }]
  })
}
export function mockTrip () {
  Mock.mock('/api/trip', {
    // 属性 list 的值是一个数组，其中含有 4 到 6 个元素
    'items': [
      {
        'traffic_id': 1,
        'traffic_name': '飞机',
        'state': 0
      },
      {
        'traffic_id': 2,
        'traffic_name': '高铁',
        'state': 0
      },
      {
        'traffic_id': 3,
        'traffic_name': '轮船',
        'state': 0
      },
      {
        'traffic_id': 4,
        'traffic_name': '派车',
        'state': 0
      },
      {
        'traffic_id': 5,
        'traffic_name': '自驾',
        'state': 0
      }
    ]
  })
}
export function mockMyTravel() {
  Mock.mock('/api/myTravel', {
    // 属性 list 的值是一个数组，其中含有 4 到 6 个元素
    'err_ok': 0,
    'travelInfo|4-6': [{
      'evection_id': 4,
      'user_id': 1,
      'state|0-5': 5,
      'user_name': '小虾',
      'leave_add': '@county(true)',
      'reach_add': '@county(true),@county(true)',
      'start': '@date',
      'end': '@date',
      'time|1-15': 15,
      'accompany': '@cname(true),@cname(true),@cname(true)',  // 陪同人
      'reason': '@cparagraph(1, 3)',
      'traffic': '飞机',
      'money|1000-5000': 5000,
      'reader': '@cname(true),@cname(true),@cname(true)', // 抄送人
      'step': 6,
      'create_time': '@datetime',
      'update_time': '@datetime'
    }]
  })
}
export function mockMySpInfo() {
  Mock.mock('/api/mySpInfo', {
    'spInfo': [
      {
        'step': '1',
        'type': '1',
        'user_id': '2',
        'user_name': '马敏',
        'state': '2'
      },
      {
        'step': '1',
        'type': '1',
        'user_id': '3',
        'user_name': '杜强',
        'state': '1'
      },
      {
        'step': '1',
        'type': '1',
        'user_id': '4',
        'user_name': '丁平',
        'state': '3'
      },
      {
        'step': '2',
        'type': '2',
        'user_id': '5',
        'user_name': '曹丽',
        'state': '0'
      },
      {
        'step': '2',
        'type': '2',
        'user_id': '6',
        'user_name': '秦洋',
        'state': '3'
      },
      {
        'step': '2',
        'type': '2',
        'user_id': '7',
        'user_name': '邱敏',
        'state': '3'
      },
      {
        'step': '3',
        'type': '1',
        'user_id': '8',
        'user_name': '程敏',
        'state': '0'
      },
      {
        'step': '3',
        'type': '1',
        'user_id': '9',
        'user_name': '姜平',
        'state': '4'
      },
      {
        'step': '3',
        'type': '1',
        'user_id': '10',
        'user_name': '周磊',
        'state': '0'
      }
    ]
  })
}
export function mockMy() {
  Mock.mock('/api/myself', {
    'err_ok': 0,
    'user': [
      {
        'user_name': '王安',
        'department_name': '策划部',
        'department_id': '2',
        'job_name': '部门经理',
        'job_id': '5',
        'tel': '123456',
        'age': '35'
      }
    ]
  })
}
